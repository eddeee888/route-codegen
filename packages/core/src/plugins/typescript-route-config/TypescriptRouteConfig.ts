import { CodegenPluginGeneratedFilesProcessor, TemplateFile } from "../../utils";

export const plugin: CodegenPluginGeneratedFilesProcessor = {
  type: "generated-files-processor",
  generate: ({ destinationDir, files }) => {
    files.reduce<string[]>((templateChunks, file) => {
      console.log(file.template);

      return [...templateChunks];
    }, []);

    const file: TemplateFile = {
      destinationDir: destinationDir,
      extension: ".ts",
      filename: "routeConfig",
      hasDefaultExport: false,
      hasNamedExports: true,
      template: "",
      routeName: "",
    };

    return [file];
  },
};
