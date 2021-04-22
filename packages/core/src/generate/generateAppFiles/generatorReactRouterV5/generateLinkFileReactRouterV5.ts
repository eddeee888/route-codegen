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
    hasPathParams,
  });

  const template = `${printImport({ defaultImport: "React", from: "react" })}
  ${printImport(importGenerateUrl)}
  ${importLink ? printImport(importLink) : ""}
  ${printImport({
    namedImports: [{ name: patternName }, { name: urlParamsInterfaceName }],
    from: `./${routePatternFilename}`,
  })}
  ${linkPropsTemplate}
  export const ${functionName}: React.FunctionComponent<${linkPropsInterfaceName}> = ({ urlParams, ...props }) => {
    const to = ${generateUrlFnName}(${patternName}, { path: ${
    hasPathParams ? "urlParams.path" : "{}"
  }, query: urlParams?.query, origin: urlParams?.origin });
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
  hasPathParams: boolean;
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
  const { routeLinkOption, defaultLinkPropsInterfaceName, urlParamsInterfaceName, hasPathParams } = params;
  const { hrefProp, linkProps, importLink, linkComponent } = routeLinkOption;

  const urlParamsModifier = hasPathParams ? "" : "?";
  const urlParamsTemplate = `{ urlParams${urlParamsModifier}: ${urlParamsInterfaceName} }`;

  const linkPropsTemplate = `type ${defaultLinkPropsInterfaceName} = Omit<${linkProps}, '${hrefProp}'> & ${urlParamsTemplate}`;
  const linkPropsInterfaceName = defaultLinkPropsInterfaceName;

  return {
    importLink,
    linkPropsTemplate,
    linkComponent,
    hrefProp,
    linkPropsInterfaceName,
  };
};
