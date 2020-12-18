import { Config, AppConfig } from "./config";
import generateExternalRoutesConfig from "./generateExternalRoutesConfig";
import generateAppFiles from "./generateAppFiles";
import { writeFile } from "./utils";
import { TemplateFile } from "./types";
import handleCommandFlags, { CommandFlags } from "./handleCommandFlags";

const generate = (config: Config, commandFlags: CommandFlags): void => {
  handleCommandFlags(commandFlags);

  // TODO: make this async maybe
  const { apps } = config;
  const filesToWrite = generateFilesToWrite(apps);
  filesToWrite.forEach(writeFile);
};

const generateFilesToWrite = (apps: Record<string, AppConfig>): TemplateFile[] => {
  const mainAppFiles = Object.entries(apps).map(([appName, appConfig]) => generateAppFiles(appName, appConfig));

  const otherApps = generateExternalRoutesConfig(apps);
  const otherAppFiles = Object.entries(otherApps).map(([appName, appConfig]) => generateAppFiles(appName, appConfig));

  return [...mainAppFiles, ...otherAppFiles].flat();
};

export default generate;
