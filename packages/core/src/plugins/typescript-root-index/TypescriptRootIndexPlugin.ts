import { GeneratedFilesProcessorCodegenPlugin, TemplateFile } from "../../utils";

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
