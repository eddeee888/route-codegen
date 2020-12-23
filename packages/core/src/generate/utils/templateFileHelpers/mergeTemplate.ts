import { TemplateFile } from "../../types";

export const mergeTemplate = (fileA: TemplateFile, fileB: TemplateFile): TemplateFile => {
  return {
    ...fileA,
    template: `${fileA.template}${fileB.template}`,
  };
};
