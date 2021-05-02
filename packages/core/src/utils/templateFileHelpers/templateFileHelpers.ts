import { mkdirSync, writeFileSync } from "fs";
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

const writeFile = ({ template, filename, extension, destinationDir }: TemplateFile): void => {
  const finalTemplate = `/* This file was automatically generated with route-codegen and should not be edited. */\n${template}`;
  mkdirSync(destinationDir, { recursive: true });
  writeFileSync(destinationDir.concat("/", filename, extension), finalTemplate);
};

export const templateFileHelpers = {
  samePath,
  mergeTemplate,
  isPatternTemplateFile,
  writeFile,
};
