import { TemplateFile, Import } from "../../types";
import { printImport } from "../../utils";
import { PatternNamedExports } from "../types";

type GenerateUrlFile = (params: {
  importGenerateUrl: Import;
  patternNamedExports: PatternNamedExports;
  routeName: string;
  destinationDir: string;
}) => TemplateFile;

const generateUrlFile: GenerateUrlFile = ({
  importGenerateUrl,
  patternNamedExports: { patternName, urlPartsInterfaceName, filename, pathParamsInterfaceName, originName },
  routeName,
  destinationDir,
}) => {
  const functionName = `generateUrl${routeName}`;
  const pathVariable = pathParamsInterfaceName ? "urlParts.path" : "{}";
  const urlPartOptionalModifier = pathParamsInterfaceName ? "" : "?";

  const template = `${printImport(importGenerateUrl)}
  ${printImport({
    namedImports: [{ name: patternName }, { name: urlPartsInterfaceName }, { name: originName }],
    from: `./${filename}`,
  })}
  const ${functionName} = ( urlParts${urlPartOptionalModifier}: ${urlPartsInterfaceName} ): string => generateUrl(${patternName}, ${pathVariable}, urlParts?.query, urlParts?.origin ?? ${originName});
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
