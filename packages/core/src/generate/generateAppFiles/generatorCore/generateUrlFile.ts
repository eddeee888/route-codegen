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
  patternNamedExports: { patternName, urlPartsInterfaceName, filename, pathParamsInterfaceName, originName },
  routeName: originalRouteName,
  destinationDir,
}) => {
  const routeName = capitalizeFirstChar(originalRouteName);

  const functionName = `generateUrl${routeName}`;
  const pathVariable = pathParamsInterfaceName ? "urlParts.path" : "{}";
  const urlPartOptionalModifier = pathParamsInterfaceName ? "" : "?";

  const template = `${printImport(importGenerateUrl)}
  ${printImport({
    namedImports: [{ name: patternName }, { name: urlPartsInterfaceName }, { name: originName }],
    from: `./${filename}`,
  })}
  export const ${functionName} = ( urlParts${urlPartOptionalModifier}: ${urlPartsInterfaceName} ): string => generateUrl({pattern: ${patternName}, path: ${pathVariable}, query: urlParts?.query, origin: urlParts?.origin ?? ${originName}});`;

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
