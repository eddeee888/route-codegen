import { printImport, capitalizeFirstChar } from "../../utils";
import { TemplateFile, Import } from "../../types";
import { PatternNamedExports } from "../types";

export interface GenerateUseRedirectFileDefaultParams {
  routeName: string;
  patternNamedExports: PatternNamedExports;
  destinationDir: string;
  importGenerateUrl: Import;
}

const generateUseRedirectFileDefault = (params: GenerateUseRedirectFileDefaultParams): TemplateFile => {
  const { routeName: originalRouteName, patternNamedExports, destinationDir, importGenerateUrl } = params;

  const routeName = capitalizeFirstChar(originalRouteName);

  const functionName = `useRedirect${routeName}`;
  const pathVariable = patternNamedExports.pathParamsInterfaceName ? "urlParts.path" : "{}";
  const resultTypeInterface = `RedirectFn${routeName}`;

  const template = `${printImport({
    namedImports: [
      { name: patternNamedExports.urlPartsInterfaceName },
      { name: patternNamedExports.patternName },
      { name: patternNamedExports.originName },
    ],
    from: `./${patternNamedExports.filename}`,
  })}
  ${printImport(importGenerateUrl)}
  export type ${resultTypeInterface} = (urlParts${!patternNamedExports.pathParamsInterfaceName ? "?" : ""}: ${
    patternNamedExports.urlPartsInterfaceName
  }) => void;
  const ${functionName} = (): ${resultTypeInterface} => {
    const redirect: ${resultTypeInterface} = urlParts => {
      const to = generateUrl(${patternNamedExports.patternName}, ${pathVariable}, urlParts?.query, urlParts?.origin ?? ${
    patternNamedExports.originName
  });
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
    routeName: originalRouteName,
    hasDefaultExport: true,
    hasNamedExports: true,
  };

  return templateFile;
};

export default generateUseRedirectFileDefault;
