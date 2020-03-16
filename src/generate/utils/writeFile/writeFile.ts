import { mkdirSync, writeFileSync } from 'fs';
import { TemplateFile } from '../../types';

const writeFile = ({ template, filename, extension, destinationDir }: TemplateFile): void => {
  mkdirSync(destinationDir, { recursive: true });
  writeFileSync(destinationDir.concat('/', filename, extension), template);
};

export default writeFile;
