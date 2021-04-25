import { TemplateFile, Import } from "../../types";
import { printImport, capitalizeFirstChar } from "../../utils";
import { RouteLinkOptions } from "../../config";
import { PatternNamedExports } from "../types";

export interface GenerateLinkFileDefaultParams {
  routeName: string;
  destinationDir: string;
  routeLinkOption: RouteLinkOptions["Default"];
  patternNamedExports: PatternNamedExports;
  importGenerateUrl: Import;
}

export const generateLinkFileDefault = (params: GenerateLinkFileDefaultParams): TemplateFile => {
  const {
    routeName: originalRouteName,
    routeLinkOption,
    destinationDir,
    patternNamedExports: { patternName, pathParamsInterfaceName, filename: routePatternFilename, urlParamsInterfaceName, originName },
    importGenerateUrl,
  } = params;

  const routeName = capitalizeFirstChar(originalRouteName);

  const functionName = `Link${routeName}`;
  const defaultLinkPropsInterfaceName = `Link${routeName}Props`;
  const hasPathParams = !!pathParamsInterfaceName;

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
    namedImports: [{ name: patternName }, { name: urlParamsInterfaceName }, { name: originName }],
    from: `./${routePatternFilename}`,
  })}
  ${linkPropsTemplate}
  export const ${functionName}: React.FunctionComponent<${linkPropsInterfaceName}> = ({ urlParams, ...props }) => {
    const to = generateUrl(${patternName}, { path: ${
    hasPathParams ? "urlParams.path" : "{}"
  }, query: urlParams?.query, origin: urlParams?.origin ?? ${originName} });
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
  routeLinkOption: RouteLinkOptions["Default"];
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

  // if there's inlineLinkPropsTemplate, we don't import anything
  let linkPropsTemplate = `type ${defaultLinkPropsInterfaceName} = Omit<${linkProps}, '${hrefProp}'> & ${urlParamsTemplate}`;
  let linkPropsInterfaceName = defaultLinkPropsInterfaceName;
  if ("inlineLinkProps" in routeLinkOption && routeLinkOption.inlineLinkProps) {
    linkPropsTemplate = `${routeLinkOption.inlineLinkProps.template} & ${urlParamsTemplate}`;
    linkPropsInterfaceName = routeLinkOption.inlineLinkProps.linkProps;
  }

  return {
    importLink,
    linkPropsTemplate,
    linkComponent,
    hrefProp,
    linkPropsInterfaceName,
  };
};
