import { TemplateFile, Import } from "../../types";
import { printImport, throwError, capitalizeFirstChar } from "../../utils";
import { RouteLinkOptions } from "../../config";
import { PatternNamedExports } from "../types";

export interface GenerateLinkFileNextJSParams {
  routeName: string;
  destinationDir: string;
  routeLinkOption: RouteLinkOptions["NextJS"];
  patternNamedExports: PatternNamedExports;
  importGenerateUrl: Import;
}

export const generateLinkFileNextJS = (params: GenerateLinkFileNextJSParams): TemplateFile => {
  const {
    routeName: originalRouteName,
    routeLinkOption,
    destinationDir,
    patternNamedExports: {
      filename: routePatternFilename,
      pathParamsInterfaceName,
      urlParamsInterfaceName,
      patternNameNextJS,
      possiblePathParamsVariableName,
    },
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

  if (!patternNameNextJS) {
    return throwError([], 'Missing "patternNameNextJS". This is most likely a problem with route-codegen.');
  }

  const namedImportsFromPatternFile = [{ name: urlParamsInterfaceName }, { name: patternNameNextJS }];
  let pathnameTemplate = `const pathname = ${patternNameNextJS};`;
  if (possiblePathParamsVariableName) {
    namedImportsFromPatternFile.push({ name: possiblePathParamsVariableName });
    pathnameTemplate = `const pathname = ${possiblePathParamsVariableName}.filter((key) => !(key in path)).reduce((prevPattern, suppliedParam) => prevPattern.replace(\`/[${"${suppliedParam"}}]\`, ""), ${patternNameNextJS});`;
  }

  const template = `${printImport({ defaultImport: "React", from: "react" })}
  ${importLink ? printImport(importLink) : ""}
  ${printImport({ namedImports: namedImportsFromPatternFile, from: `./${routePatternFilename}` })}
  ${linkPropsTemplate}
  export const ${functionName}: React.FunctionComponent<${linkPropsInterfaceName}> = ({ urlParams, ...props}) => {
    const { query = {} } = urlParams;
    const path = ${hasPathParams ? "urlParams.path" : "{}"};
    ${pathnameTemplate}
    const nextHref = {
      pathname: pathname,
      query: {
        ...path,
        ...query,
      },
    }
    return <${linkComponent} {...props} ${hrefProp}={nextHref} />;
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
  routeLinkOption: RouteLinkOptions["NextJS"];
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
