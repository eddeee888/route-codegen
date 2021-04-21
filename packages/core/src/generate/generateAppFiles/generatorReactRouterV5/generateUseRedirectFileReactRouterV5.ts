import { printImport, capitalizeFirstChar } from "../../utils";
import { TemplateFile, Import } from "../../types";
import { PatternNamedExports } from "../types";

export interface GenerateUseRedirectFileReactRouterV5Params {
  routeName: string;
  patternNamedExports: PatternNamedExports;
  destinationDir: string;
  importGenerateUrl: Import;
}

export const generateUseRedirectFileReactRouterV5 = (params: GenerateUseRedirectFileReactRouterV5Params): TemplateFile => {
  const { routeName: originalRouteName, patternNamedExports, destinationDir, importGenerateUrl } = params;

  const routeName = capitalizeFirstChar(originalRouteName);

  const functionName = `useRedirect${routeName}`;
  const pathVariable = patternNamedExports.pathParamsInterfaceName ? "urlParts.path" : "{}";
  const resultTypeInterface = `RedirectFn${routeName}`;
  const generateUrlFnName = "generateUrl"; // TODO: find a better way to reference this

  const template = `${printImport({
    namedImports: [{ name: "useHistory" }],
    from: "react-router",
  })}
  ${printImport({
    namedImports: [{ name: patternNamedExports.urlParamsInterfaceName }, { name: patternNamedExports.patternName }],
    from: `./${patternNamedExports.filename}`,
  })}
  ${printImport(importGenerateUrl)}
  export type ${resultTypeInterface} = (urlParts${!patternNamedExports.pathParamsInterfaceName ? "?" : ""}: ${
    patternNamedExports.urlParamsInterfaceName
  }) => void;
  export const ${functionName} = (): ${resultTypeInterface} => {
    const history = useHistory();
    const redirect: ${resultTypeInterface} = urlParts => {
      const to = ${generateUrlFnName}(${
    patternNamedExports.patternName
  }, { path: ${pathVariable}, query: urlParts?.query, origin: urlParts?.origin });
      history.push(to);
    }
    return redirect;
  }`;

  const templateFile: TemplateFile = {
    template,
    filename: functionName,
    extension: ".ts",
    destinationDir,
    routeName: originalRouteName,
    hasDefaultExport: false,
    hasNamedExports: true,
  };

  return templateFile;
};
