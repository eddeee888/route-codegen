import { PatternNamedExports } from "../types";
import { Import, TemplateFile } from "../../types";
import printImport from "../../utils/printImport";
import throwError from "../../utils/throwError";

export interface GenerateUseRedirectFileNextJSParams {
  routeName: string;
  patternNamedExports: PatternNamedExports;
  destinationDir: string;
  importGenerateUrl: Import;
}

const generateUseRedirectFileNextJS = (params: GenerateUseRedirectFileNextJSParams): TemplateFile => {
  const {
    routeName,
    patternNamedExports: {
      patternName,
      pathParamsInterfaceName,
      filename: routePatternFilename,
      urlPartsInterfaceName,
      patternNameNextJS,
      possiblePathParamsVariableName,
    },
    destinationDir,
    importGenerateUrl,
  } = params;

  if (!patternNameNextJS) {
    return throwError([], 'Missing "patternNameNextJS". This is most likely a problem with route-codegen.');
  }

  const functionName = `useRedirect${routeName}`;
  const pathVariable = pathParamsInterfaceName ? "urlParts.path" : "{}";
  const resultTypeInterface = `Redirect${routeName}`;

  let namedImportsFromPatternFile = [{ name: patternName }, { name: urlPartsInterfaceName }, { name: patternNameNextJS }];
  let routerTemplate = `Router.push(${patternNameNextJS}, to);`;
  if (possiblePathParamsVariableName) {
    namedImportsFromPatternFile.push({ name: possiblePathParamsVariableName });
    routerTemplate = `const url = ${possiblePathParamsVariableName}.filter((key) => !(key in urlParts.path)).reduce((prevPattern, suppliedParam) => prevPattern.replace(\`/[${"${suppliedParam"}}]\`, ""), ${patternNameNextJS});
      Router.push(url, to);`;
  }

  const template = `${printImport({ defaultImport: "Router", from: "next/router" })}
  ${printImport({ namedImports: namedImportsFromPatternFile, from: `./${routePatternFilename}` })}
  ${printImport(importGenerateUrl)}
  export type ${resultTypeInterface} = (urlParts: ${urlPartsInterfaceName}) => void;
  const ${functionName} = (): ${resultTypeInterface} => {
    const redirect: ${resultTypeInterface} = urlParts => {
      const to = generateUrl(${patternName}, ${pathVariable}, urlParts.urlQuery);
      ${routerTemplate}
    }
    return redirect;
  }
  export default ${functionName}`;

  const templateFile: TemplateFile = {
    template,
    filename: functionName,
    extension: ".ts",
    destinationDir,
  };

  return templateFile;
};

export default generateUseRedirectFileNextJS;
