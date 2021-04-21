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

  const template = `${printImport({ defaultImport: "React", from: "react" })}
  ${printImport(importRedirectServerSide)}
  ${printImport(importGenerateUrl)}
  ${printImport({
    namedImports: [
      { name: patternNamedExports.urlPartsInterfaceName },
      { name: patternNamedExports.patternName },
      { name: patternNamedExports.originName },
    ],
    from: `./${patternNamedExports.filename}`,
  })}
  export const ${functionName}: React.FunctionComponent<${
    patternNamedExports.urlPartsInterfaceName
  } & { fallback?: React.ReactNode }> = props => {
    const to = ${generateUrlFnName}({ pattern: ${patternNamedExports.patternName}, path: ${
    hasPathParams ? "props.path" : "{}"
  }, query: props.query, origin: props.origin ?? ${patternNamedExports.originName} });
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
