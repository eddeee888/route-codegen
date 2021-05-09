import { capitalizeFirstChar, printImport, TemplateFile, GeneralCodegenPlugin } from "../../utils";

/**
 * typescript-generate-url is a general plugin
 * This is used to generate functions that are bound with route locations
 *
 * @name    typescript-generate-url plugin
 * @kind    function
 * @returns {TemplateFile[]} Array of with one generated TemplateFile.
 */
export const plugin: GeneralCodegenPlugin = {
  type: "general",
  generate: (config) => {
    const {
      context: { importGenerateUrl },
      patternNamedExports: { patternName, urlParamsInterfaceName, filename, pathParamsInterfaceName, originName },
      routeName: originalRouteName,
      destinationDir,
    } = config;

    const routeName = capitalizeFirstChar(originalRouteName);

    const functionName = `${importGenerateUrl.importedName}${routeName}`;
    const pathVariable = pathParamsInterfaceName ? "urlParams.path" : "{}";
    const urlPartOptionalModifier = pathParamsInterfaceName ? "" : "?";

    const template = `${printImport(importGenerateUrl.import)}
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
