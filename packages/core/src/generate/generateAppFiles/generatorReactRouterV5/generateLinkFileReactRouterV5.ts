import { TemplateFile, Import } from "../../types";
import { printImport, capitalizeFirstChar } from "../../utils";
import { RouteLinkOptions } from "../../config";
import { PatternNamedExports } from "../types";

export interface GenerateLinkFileReactRouterV5Params {
  routeName: string;
  destinationDir: string;
  routeLinkOption: RouteLinkOptions["ReactRouterV5"];
  patternNamedExports: PatternNamedExports;
  importGenerateUrl: Import;
}

export const generateLinkFileReactRouterV5 = (params: GenerateLinkFileReactRouterV5Params): TemplateFile => {
  const {
    routeName: originalRouteName,
    routeLinkOption,
    destinationDir,
    patternNamedExports: { patternName, pathParamsInterfaceName, filename: routePatternFilename, urlParamsInterfaceName },
    importGenerateUrl,
  } = params;

  const routeName = capitalizeFirstChar(originalRouteName);

  const functionName = `Link${routeName}`;
  const defaultLinkPropsInterfaceName = `Link${routeName}Props`;
  const hasPathParams = !!pathParamsInterfaceName;
  const generateUrlFnName = "generateUrl"; // TODO: find a better way to reference this

  const { hrefProp, importLink, linkComponent, linkPropsTemplate, linkPropsInterfaceName } = generateLinkInterface({
    defaultLinkPropsInterfaceName,
    urlParamsInterfaceName,
    routeLinkOption,
  });

  const template = `${printImport({ defaultImport: "React", from: "react" })}
  ${printImport(importGenerateUrl)}
  ${importLink ? printImport(importLink) : ""}
  ${printImport({
    namedImports: [{ name: patternName }, { name: urlParamsInterfaceName }],
    from: `./${routePatternFilename}`,
  })}
  ${linkPropsTemplate}
  export const ${functionName}: React.FunctionComponent<${linkPropsInterfaceName}> = ({ ${
    hasPathParams ? "path," : ""
  } query, origin, ...props }) => {
    const to = ${generateUrlFnName}(${patternName}, { path: ${hasPathParams ? "path" : "{}"}, query, origin });
    return <${linkComponent} {...props} ${hrefProp}={to} />;
  }`;

  const templateFile: TemplateFile = {
    template,
    filename: functionName,
    extension: ".tsx",
    destinationDir,
    routeName: originalRouteName,
    hasDefaultExport: false,
    hasNamedExports: true,
  };

  return templateFile;
};

interface GenerateLinkInterfaceParams {
  routeLinkOption: RouteLinkOptions["ReactRouterV5"];
  defaultLinkPropsInterfaceName: string;
  urlParamsInterfaceName: string;
}

interface GenerateLinkInterfaceResult {
  importLink?: Import;
  linkPropsTemplate: string;
  linkComponent: string;
  linkProps?: string;
  hrefProp: string;
  linkPropsInterfaceName: string;
}

const generateLinkInterface = (params: GenerateLinkInterfaceParams): GenerateLinkInterfaceResult => {
  const { routeLinkOption, defaultLinkPropsInterfaceName, urlParamsInterfaceName } = params;

  const { hrefProp, linkProps, importLink, linkComponent } = routeLinkOption;

  const linkPropsTemplate = `type ${defaultLinkPropsInterfaceName} = Omit<${linkProps}, '${hrefProp}'> & ${urlParamsInterfaceName}`;
  const linkPropsInterfaceName = defaultLinkPropsInterfaceName;

  return {
    importLink,
    linkPropsTemplate,
    linkComponent,
    hrefProp,
    linkPropsInterfaceName,
  };
};
