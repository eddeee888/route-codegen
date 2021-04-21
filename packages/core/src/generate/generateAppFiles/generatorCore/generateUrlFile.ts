import { TemplateFile, Import } from "../../types";
import { printImport, capitalizeFirstChar } from "../../utils";
import { PatternNamedExports } from "../types";

export type GenerateUrlFile = (params: {
  importGenerateUrl: Import;
  patternNamedExports: PatternNamedExports;
  routeName: string;
  destinationDir: string;
}) => TemplateFile;

export const generateUrlFile: GenerateUrlFile = ({
  importGenerateUrl,
  patternNamedExports: { patternName, urlParamsInterfaceName, filename, pathParamsInterfaceName, originName },
  routeName: originalRouteName,
  destinationDir,
}) => {
  const routeName = capitalizeFirstChar(originalRouteName);

  const functionName = `generateUrl${routeName}`;
  const pathVariable = pathParamsInterfaceName ? "urlParams.path" : "{}";
  const urlPartOptionalModifier = pathParamsInterfaceName ? "" : "?";

  const template = `${printImport(importGenerateUrl)}
  ${printImport({
    namedImports: [{ name: patternName }, { name: urlParamsInterfaceName }, { name: originName }],
    from: `./${filename}`,
  })}
  export const ${functionName} = ( urlParams${urlPartOptionalModifier}: ${urlParamsInterfaceName} ): string => generateUrl(${patternName}, { path: ${pathVariable}, query: urlParams?.query, origin: urlParams?.origin ?? ${originName}});`;

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
