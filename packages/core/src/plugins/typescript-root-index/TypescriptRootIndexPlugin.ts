import { GeneratedFilesProcessorCodegenPlugin, TemplateFile } from "../../utils";

/**
 * typescript-root-index is a generated-files-processor plugin.
 * This is used to create a index file at the root to re-export
 * all generated constants and functions as one module.
 *
 * @name    typescript-root-index plugin
 * @kind    function
 * @returns {TemplateFile[]} Array with one TemplateFile that is the index file
 */
export const plugin: GeneratedFilesProcessorCodegenPlugin = {
  type: "generated-files-processor",
  generate: ({ destinationDir, files }) => {
    if (files.length === 0) {
      return [];
    }

    const template = files.reduce((prevTemplate, file) => {
      let newTemplate = prevTemplate;
      if (file.hasDefaultExport) {
        newTemplate += `export { default as ${file.filename} } from "./${file.routeName}/${file.filename}";`;
      }
      if (file.hasNamedExports) {
        newTemplate += `export * from "./${file.routeName}/${file.filename}";`;
      }
      return newTemplate;
    }, "");

    const rootIndexFile: TemplateFile = {
      destinationDir: destinationDir,
      extension: ".ts",
      filename: "index",
      hasDefaultExport: false,
      hasNamedExports: true,
      template: template,
      routeName: "",
    };

    return [rootIndexFile];
  },
};
