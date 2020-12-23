import { TemplateFile, Import } from "../../types";
import { printImport } from "../../utils";
import { PatternNamedExports } from "../types";

export interface GenerateRedirectFileDefaultParams {
  routeName: string;
  destinationDir: string;
  patternNamedExports: PatternNamedExports;
  importGenerateUrl: Import;
  importRedirectServerSide: Import;
}

const generateRedirectFileDefault = (params: GenerateRedirectFileDefaultParams): TemplateFile => {
  const { routeName, destinationDir, importGenerateUrl, patternNamedExports, importRedirectServerSide } = params;

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
  const ${functionName}: React.FunctionComponent<${patternNamedExports.urlPartsInterfaceName} & { fallback?: React.ReactNode }> = props => {
    const to = ${generateUrlFnName}(${patternNamedExports.patternName}, ${
    hasPathParams ? "props.path" : "{}"
  }, props.query, props.origin ?? ${patternNamedExports.originName});
    return <${redirectCompName} href={to} fallback={props.fallback} />;
  };
  export default ${functionName}`;

  return {
    filename: functionName,
    destinationDir,
    extension: ".tsx",
    template,
    hasDefaultExport: true,
    hasNamedExports: false,
  };
};

export default generateRedirectFileDefault;
