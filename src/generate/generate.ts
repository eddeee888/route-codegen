import { Config, AppConfig } from './config';
import generateExternalRoutesConfig from './generateExternalRoutesConfig';
import generateAppFiles from './generateAppFiles';
import writeFile from './utils/writeFile';
import { TemplateFile } from './types';

function generate(config: Config): void {
  // TODO: make this async maybe

  const { apps } = config;

  const filesToWrite = generateFilesToWrite(apps);

  filesToWrite.forEach(writeFile);
}

function generateFilesToWrite(apps: Record<string, AppConfig>): TemplateFile[] {
  const mainAppFiles = Object.values(apps).map(generateAppFiles);

  const otherApps = generateExternalRoutesConfig(apps);
  const otherAppFiles = Object.values(otherApps).map(generateAppFiles);

  return [...mainAppFiles, ...otherAppFiles].flat();
}

export default generate;
