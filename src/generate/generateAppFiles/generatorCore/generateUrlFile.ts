import { TemplateFile, Import } from "../../types";
import printImport from "../../utils/printImport";
import { PatternNamedExports } from "../types";

type GenerateUrlFile = (params: {
  importGenerateUrl: Import;
  patternNamedExports: PatternNamedExports;
  routeName: string;
  destinationDir: string;
}) => TemplateFile;

const generateUrlFile: GenerateUrlFile = ({
  importGenerateUrl,
  patternNamedExports: { patternName, urlPartsInterfaceName, filename, pathParamsInterfaceName },
  routeName,
  destinationDir,
}) => {
  const functionName = `generateUrl${routeName}`;
  const pathVariable = pathParamsInterfaceName ? "urlParts.path" : "{}";
  const urlPartOptionalModifier = pathParamsInterfaceName ? "" : "?";

  const template = `${printImport(importGenerateUrl)}
  ${printImport({
    namedImports: [{ name: patternName }, { name: urlPartsInterfaceName }],
    from: `./${filename}`,
  })}
  const ${functionName} = ( urlParts${urlPartOptionalModifier}: ${urlPartsInterfaceName} ): string => generateUrl(${patternName}, ${pathVariable}, urlParts?.urlQuery, urlParts?.origin);
  export default ${functionName};
  `;

  const templateFile: TemplateFile = {
    template,
    filename: functionName,
    extension: ".ts",
    destinationDir,
  };

  return templateFile;
};

export default generateUrlFile;
