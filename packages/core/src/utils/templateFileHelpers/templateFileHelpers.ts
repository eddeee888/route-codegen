import { PatternTemplateFile, TemplateFile } from "../types";

const mergeTemplate = (fileA: TemplateFile, fileB: TemplateFile): TemplateFile => {
  return {
    ...fileA,
    template: `${fileA.template}${fileB.template}`,
  };
};

const samePath = (fileA: TemplateFile, fileB: TemplateFile): boolean =>
  fileA.destinationDir === fileB.destinationDir && fileA.extension === fileB.extension && fileA.filename === fileB.filename;

const isPatternTemplateFile = (file: TemplateFile): file is PatternTemplateFile => {
  return file.type === "pattern";
};

export const templateFileHelpers = {
  samePath,
  mergeTemplate,
  isPatternTemplateFile,
};
