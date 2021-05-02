import { GeneratedFilesProcessorCodegenPlugin, TemplateFile, templateFileHelpers } from "../../utils";

export const plugin: GeneratedFilesProcessorCodegenPlugin = {
  type: "generated-files-processor",
  generate: ({ destinationDir, files }) => {
    const templates = files.reduce<string[]>((templateChunks, file) => {
      if (!templateFileHelpers.isPatternTemplateFile(file)) {
        return templateChunks;
      }

      const template = `${file.routeName}: ${file.routingType === "route-external" ? "ExternalComponent" : "InternalComponent"},`;

      return [...templateChunks, template];
    }, []);

    templates.unshift("export const routeConfig = {");
    templates.push("}");

    const file: TemplateFile = {
      destinationDir: destinationDir,
      extension: ".ts",
      filename: "routeConfig",
      hasDefaultExport: false,
      hasNamedExports: true,
      template: templates.join("\n"),
      routeName: "",
    };

    return [file];
  },
};
