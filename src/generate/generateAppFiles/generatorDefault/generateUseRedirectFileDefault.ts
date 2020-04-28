import printImport from "../../utils/printImport";
import { TemplateFile, Import } from "../../types";
import { PatternNamedExports } from "../types";

export interface GenerateUseRedirectFileDefaultParams {
  routeName: string;
  patternNamedExports: PatternNamedExports;
  destinationDir: string;
  importGenerateUrl: Import;
}

const generateUseRedirectFileDefault = (params: GenerateUseRedirectFileDefaultParams): TemplateFile => {
  const { routeName, patternNamedExports, destinationDir, importGenerateUrl } = params;
  const functionName = `useRedirect${routeName}`;
  const pathVariable = patternNamedExports.pathParamsInterfaceName ? "urlParts.path" : "{}";
  const resultTypeInterface = `Redirect${routeName}`;

  const template = `${printImport({
    namedImports: [{ name: patternNamedExports.urlPartsInterfaceName }, { name: patternNamedExports.patternName }],
    from: `./${patternNamedExports.filename}`,
  })}
  ${printImport(importGenerateUrl)}
  export type ${resultTypeInterface} = (urlParts: ${patternNamedExports.urlPartsInterfaceName}) => void;
  const ${functionName} = (): ${resultTypeInterface} => {
    const redirect: ${resultTypeInterface} = urlParts => {
      const to = generateUrl(${patternNamedExports.patternName}, ${pathVariable}, urlParts.urlQuery);
      if (!!window && !!window.location) {
        window.location.href = to;
      }
      return;
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

export default generateUseRedirectFileDefault;
