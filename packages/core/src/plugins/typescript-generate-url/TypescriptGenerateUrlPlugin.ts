import { capitalizeFirstChar, printImport, TemplateFile, GeneralCodegenPlugin } from "../../utils";

export const plugin: GeneralCodegenPlugin = {
  type: "general",
  generate: (config) => {
    const {
      importGenerateUrl,
      patternNamedExports: { patternName, urlParamsInterfaceName, filename, pathParamsInterfaceName, originName },
      routeName: originalRouteName,
      destinationDir,
    } = config;

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

    return [templateFile];
  },
};
