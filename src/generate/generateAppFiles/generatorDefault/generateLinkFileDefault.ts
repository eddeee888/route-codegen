import { TemplateFile, Import } from "../../types";
import printImport from "../../utils/printImport";
import { RouteLinkOptions } from "../parseAppConfig";
import { PatternNamedExports } from "../types";

export interface GenerateLinkFileDefaultParams {
  routeName: string;
  destinationDir: string;
  routeLinkOption: RouteLinkOptions["Default"];
  patternNamedExports: PatternNamedExports;
  importGenerateUrl: Import;
}

const generateLinkFileDefault = (params: GenerateLinkFileDefaultParams): TemplateFile => {
  const {
    routeName,
    routeLinkOption,
    destinationDir,
    patternNamedExports: { patternName, pathParamsInterfaceName, filename: routePatternFilename, urlPartsInterfaceName },
    importGenerateUrl,
  } = params;

  const functionName = `Link${routeName}`;
  const defaultLinkPropsInterfaceName = `Link${routeName}Props`;
  const hasPathParams = !!pathParamsInterfaceName;

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
  } urlQuery, origin, ...props }) => {
    const to = generateUrl(${patternName}, ${hasPathParams ? "path" : "{}"}, urlQuery, origin);
    return <${linkComponent} {...props} ${hrefProp}={to} />;
  }
  export default ${functionName};
  `;

  const templateFile: TemplateFile = {
    template,
    filename: functionName,
    extension: ".tsx",
    destinationDir,
  };

  return templateFile;
};

interface GenerateLinkInterfaceParams {
  routeLinkOption: RouteLinkOptions["Default"];
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

  // if there's inlineLinkPropsTemplate, we don't import anything
  let linkPropsTemplate = `type ${defaultLinkPropsInterfaceName} = Omit<${linkProps}, '${hrefProp}'> & ${urlPartsInterfaceName}`;
  let linkPropsInterfaceName = defaultLinkPropsInterfaceName;
  if ("inlineLinkProps" in routeLinkOption && routeLinkOption.inlineLinkProps) {
    linkPropsTemplate = `${routeLinkOption.inlineLinkProps.template} & ${urlPartsInterfaceName}`;
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

export default generateLinkFileDefault;
