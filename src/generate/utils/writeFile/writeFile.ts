import { mkdirSync, writeFileSync } from 'fs';
import { TemplateFile } from '../../types';

const writeFile = ({ template, filename, extension, destinationDir }: TemplateFile): void => {
  const finalTemplate = `/* This file was automatically generated with route-codegen and should not be edited. */\n${template}`;
  mkdirSync(destinationDir, { recursive: true });
  writeFileSync(destinationDir.concat('/', filename, extension), finalTemplate);
};

export default writeFile;
