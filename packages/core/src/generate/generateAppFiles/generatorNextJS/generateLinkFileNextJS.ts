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

  const variablesTemplate = hasPathParams
    ? `const { path = {}, query = {}, ...rest } = props;`
    : `const { query = {}, ...rest } = props; const path = {};`;

  const template = `${printImport({ defaultImport: "React", from: "react" })}
  ${importLink ? printImport(importLink) : ""}
  ${printImport({ namedImports: namedImportsFromPatternFile, from: `./${routePatternFilename}` })}
  ${linkPropsTemplate}
  export const ${functionName}: React.FunctionComponent<${linkPropsInterfaceName}> = props => {
    ${variablesTemplate}
    ${pathnameTemplate}
    const nextHref = {
      pathname: pathname,
      query: {
        ...path,
        ...query,
      },
    }
    return <${linkComponent} {...rest} ${hrefProp}={nextHref} />;
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
