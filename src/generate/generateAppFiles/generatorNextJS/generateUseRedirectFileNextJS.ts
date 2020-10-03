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
      pathParamsInterfaceName,
      filename: routePatternFilename,
      urlPartsInterfaceName,
      patternNameNextJS,
      possiblePathParamsVariableName,
    },
    destinationDir,
  } = params;

  if (!patternNameNextJS) {
    return throwError([], 'Missing "patternNameNextJS". This is most likely a problem with route-codegen.');
  }

  const functionName = `useRedirect${routeName}`;
  const pathVariable = pathParamsInterfaceName ? "urlParts.path" : "{}";
  const urlPartsModifier = pathParamsInterfaceName ? "" : "?";
  const resultTypeInterface = `RedirectFn${routeName}`;

  let namedImportsFromPatternFile = [{ name: urlPartsInterfaceName }, { name: patternNameNextJS }];
  let pathnameTemplate = `const pathname = ${patternNameNextJS};`;
  if (possiblePathParamsVariableName) {
    namedImportsFromPatternFile.push({ name: possiblePathParamsVariableName });
    pathnameTemplate = `const pathname = ${possiblePathParamsVariableName}.filter((key) => !(key in urlParts.path)).reduce((prevPattern, suppliedParam) => prevPattern.replace(\`/[${"${suppliedParam"}}]\`, ""), ${patternNameNextJS});`;
  }

  const template = `${printImport({ namedImports: [{ name: "useRouter" }], from: "next/router" })}
  ${printImport({ namedImports: namedImportsFromPatternFile, from: `./${routePatternFilename}` })}
  export type ${resultTypeInterface} = (urlParts${urlPartsModifier}: ${urlPartsInterfaceName}) => void;
  const ${functionName} = (): ${resultTypeInterface} => {
    const router = useRouter();
    const redirect: ${resultTypeInterface} = urlParts => {
      const query = urlParts?.query ?? {};
      const path = ${pathVariable};
      ${pathnameTemplate}
      router.push({
        pathname: pathname,
        query: {
          ...path,
          ...query,
        },
      })
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
