import { TemplateFile } from "../../types";

export const samePath = (fileA: TemplateFile, fileB: TemplateFile): boolean =>
  fileA.destinationDir === fileB.destinationDir && fileA.extension === fileB.extension && fileA.filename === fileB.filename;
