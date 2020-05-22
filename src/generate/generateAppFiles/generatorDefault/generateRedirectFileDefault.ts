import { TemplateFile, Import } from "../../types";
import printImport from "../../utils/printImport";
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

  const template = `${printImport({ defaultImport: "React", from: "react" })}
  ${printImport(importRedirectServerSide)}
  ${printImport(importGenerateUrl)}
  ${printImport({
    namedImports: [{ name: patternNamedExports.urlPartsInterfaceName }, { name: patternNamedExports.patternName }],
    from: `./${patternNamedExports.filename}`,
  })}
  const ${functionName}: React.FunctionComponent<${patternNamedExports.urlPartsInterfaceName} & { fallback?: React.ReactNode }> = props => {
    const to = generateUrl(${patternNamedExports.patternName}, ${hasPathParams ? "props.path" : "{}"}, props.urlQuery, props.origin);
    return <${importRedirectServerSide.defaultImport} href={to} fallback={props.fallback} />;
  };
  export default ${functionName}`;

  return {
    filename: functionName,
    destinationDir,
    extension: ".tsx",
    template,
  };
};

export default generateRedirectFileDefault;
