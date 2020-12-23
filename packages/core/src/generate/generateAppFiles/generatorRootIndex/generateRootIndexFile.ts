import { TemplateFile } from "../../types";

export interface GenerateRootIndexFileParams {
  destinationDir: string;
  files: TemplateFile[];
}

export const generateRootIndexFile = ({ files, destinationDir }: GenerateRootIndexFileParams): TemplateFile | null => {
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
};
