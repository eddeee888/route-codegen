import { TemplateFile, Import } from "../../types";
import { printImport, capitalizeFirstChar } from "../../utils";
import { PatternNamedExports } from "../types";

export interface GenerateRedirectFileDefaultParams {
  routeName: string;
  destinationDir: string;
  patternNamedExports: PatternNamedExports;
  importGenerateUrl: Import;
  importRedirectServerSide: Import;
}

export const generateRedirectFileDefault = (params: GenerateRedirectFileDefaultParams): TemplateFile => {
  const { routeName: originalRouteName, destinationDir, importGenerateUrl, patternNamedExports, importRedirectServerSide } = params;

  const routeName = capitalizeFirstChar(originalRouteName);

  const functionName = `Redirect${routeName}`;
  const hasPathParams = !!patternNamedExports.pathParamsInterfaceName;
  const generateUrlFnName = "generateUrl"; // TODO: find a better way to reference this
  const redirectCompName = "RedirectServerSide"; // TODO: find a better way to reference this

  const urlParamsModifier = hasPathParams ? "" : "?";
  const urlParamsTemplate = `urlParams${urlParamsModifier}: ${patternNamedExports.urlParamsInterfaceName}`;

  const template = `${printImport({ defaultImport: "React", from: "react" })}
  ${printImport(importRedirectServerSide)}
  ${printImport(importGenerateUrl)}
  ${printImport({
    namedImports: [
      { name: patternNamedExports.urlParamsInterfaceName },
      { name: patternNamedExports.patternName },
      { name: patternNamedExports.originName },
    ],
    from: `./${patternNamedExports.filename}`,
  })}
  export const ${functionName}: React.FunctionComponent<{ fallback?: React.ReactNode, ${urlParamsTemplate} }> = ({ urlParams , ...props }) => {
    const to = ${generateUrlFnName}(${patternNamedExports.patternName}, { path: ${
    hasPathParams ? "urlParams.path" : "{}"
  }, query: urlParams.query, origin: urlParams.origin ?? ${patternNamedExports.originName} });
    return <${redirectCompName} href={to} fallback={props.fallback} />;
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
