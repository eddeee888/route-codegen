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

const generateLinkFileReactRouterV5 = (params: GenerateLinkFileReactRouterV5Params): TemplateFile => {
  const {
    routeName: originalRouteName,
    routeLinkOption,
    destinationDir,
    patternNamedExports: { patternName, pathParamsInterfaceName, filename: routePatternFilename, urlPartsInterfaceName },
    importGenerateUrl,
  } = params;

  const routeName = capitalizeFirstChar(originalRouteName);

  const functionName = `Link${routeName}`;
  const defaultLinkPropsInterfaceName = `Link${routeName}Props`;
  const hasPathParams = !!pathParamsInterfaceName;
  const generateUrlFnName = "generateUrl"; // TODO: find a better way to reference this

  const { hrefProp, importLink, linkComponent, linkPropsTemplate, linkPropsInterfaceName } = generateLinkInterface({
    defaultLinkPropsInterfaceName,
    urlPartsInterfaceName,
    routeLinkOption,
  });

  const template = `${printImport({ defaultImport: "React", from: "react" })}
  ${printImport(importGenerateUrl)}
  ${importLink ? printImport(importLink) : ""}
  ${printImport({
    namedImports: [{ name: patternName }, { name: urlPartsInterfaceName }],
    from: `./${routePatternFilename}`,
  })}
  ${linkPropsTemplate}
  const ${functionName}: React.FunctionComponent<${linkPropsInterfaceName}> = ({ ${
    hasPathParams ? "path," : ""
  } query, origin, ...props }) => {
    const to = ${generateUrlFnName}(${patternName}, ${hasPathParams ? "path" : "{}"}, query, origin);
    return <${linkComponent} {...props} ${hrefProp}={to} />;
  }
  export default ${functionName};
  `;

  const templateFile: TemplateFile = {
    template,
    filename: functionName,
    extension: ".tsx",
    destinationDir,
    routeName: originalRouteName,
    hasDefaultExport: true,
    hasNamedExports: false,
  };

  return templateFile;
};

interface GenerateLinkInterfaceParams {
  routeLinkOption: RouteLinkOptions["ReactRouterV5"];
  defaultLinkPropsInterfaceName: string;
  urlPartsInterfaceName: string;
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
  const { routeLinkOption, defaultLinkPropsInterfaceName, urlPartsInterfaceName } = params;

  const { hrefProp, linkProps, importLink, linkComponent } = routeLinkOption;

  const linkPropsTemplate = `type ${defaultLinkPropsInterfaceName} = Omit<${linkProps}, '${hrefProp}'> & ${urlPartsInterfaceName}`;
  const linkPropsInterfaceName = defaultLinkPropsInterfaceName;

  return {
    importLink,
    linkPropsTemplate,
    linkComponent,
    hrefProp,
    linkPropsInterfaceName,
  };
};

export default generateLinkFileReactRouterV5;
