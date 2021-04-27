import { BasePlugin, TemplateFile } from "../../utils";

export interface TypescriptRootIndexPluginConfig {
  destinationDir: string;
  files: TemplateFile[];
}

class TypescriptRootIndexPlugin extends BasePlugin<Record<string, never>, TypescriptRootIndexPluginConfig, TemplateFile | null> {
  generate(): TemplateFile | null {
    const { destinationDir, files } = this.config;

    if (files.length === 0) {
      return null;
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

    return rootIndexFile;
  }
}

export default TypescriptRootIndexPlugin;
