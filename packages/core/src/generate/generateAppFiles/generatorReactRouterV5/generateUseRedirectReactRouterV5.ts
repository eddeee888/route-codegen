import { printImport, capitalizeFirstChar } from "../../utils";
import { TemplateFile, Import } from "../../types";
import { PatternNamedExports } from "../types";

export interface GenerateUseRedirectReactRouterV5Params {
  routeName: string;
  patternNamedExports: PatternNamedExports;
  destinationDir: string;
  importGenerateUrl: Import;
}

const generateUseRedirectReactRouterV5 = (params: GenerateUseRedirectReactRouterV5Params): TemplateFile => {
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
    namedImports: [{ name: patternNamedExports.urlPartsInterfaceName }, { name: patternNamedExports.patternName }],
    from: `./${patternNamedExports.filename}`,
  })}
  ${printImport(importGenerateUrl)}
  export type ${resultTypeInterface} = (urlParts${!patternNamedExports.pathParamsInterfaceName ? "?" : ""}: ${
    patternNamedExports.urlPartsInterfaceName
  }) => void;
  const ${functionName} = (): ${resultTypeInterface} => {
    const history = useHistory();
    const redirect: ${resultTypeInterface} = urlParts => {
      const to = ${generateUrlFnName}(${patternNamedExports.patternName}, ${pathVariable}, urlParts?.query, urlParts?.origin);
      history.push(to);
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

export default generateUseRedirectReactRouterV5;
