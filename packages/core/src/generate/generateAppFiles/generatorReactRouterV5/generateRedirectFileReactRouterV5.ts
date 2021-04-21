import { TemplateFile, Import } from "../../types";
import { printImport, capitalizeFirstChar } from "../../utils";
import { PatternNamedExports } from "../types";

export interface GenerateRedirectFileReactRouterV5Params {
  routeName: string;
  destinationDir: string;
  importGenerateUrl: Import;
  patternNamedExports: PatternNamedExports;
}

export const generateRedirectFileReactRouterV5 = (params: GenerateRedirectFileReactRouterV5Params): TemplateFile => {
  const { routeName: originalRouteName, destinationDir, importGenerateUrl, patternNamedExports } = params;

  const routeName = capitalizeFirstChar(originalRouteName);

  const functionName = `Redirect${routeName}`;
  const hasPathParams = !!patternNamedExports.pathParamsInterfaceName;
  const generateUrlFnName = "generateUrl"; // TODO: find a better way to reference this

  const template = `${printImport({ defaultImport: "React", from: "react" })}
  ${printImport(importGenerateUrl)}
  ${printImport({ namedImports: [{ name: "Redirect" }], from: "react-router" })}
  ${printImport({
    namedImports: [{ name: patternNamedExports.urlPartsInterfaceName }, { name: patternNamedExports.patternName }],
    from: `./${patternNamedExports.filename}`,
  })}
  export const ${functionName}: React.FunctionComponent<${
    patternNamedExports.urlPartsInterfaceName
  } & { fallback?: React.ReactNode }> = props => {
    const to = ${generateUrlFnName}(${patternNamedExports.patternName}, { path: ${
    hasPathParams ? "props.path" : "{}"
  }, query: props.query, origin: props.origin);
    return (
      <>
        <Redirect to={to} />
        {props.fallback}
      </>
    );
  };`;

  return {
    filename: functionName,
    destinationDir,
    extension: ".tsx",
    template,
    routeName: originalRouteName,
    hasDefaultExport: false,
    hasNamedExports: true,
  };
};
