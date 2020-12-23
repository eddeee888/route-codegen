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

/**
 * Function to prepare all the files to be written to disk
 */
const generateFilesToWrite = (apps: Record<string, AppConfig>): TemplateFile[] => {
  // 1. Go through the apps and generate the main route files for an app i.e. routes that are immediately inside the app
  const mainAppFiles = Object.entries(apps).map(([appName, appConfig]) => generateAppFiles(appName, appConfig));

  // 2. Go and find check the routes that are outside of each app. These are called external routes and `default` link option is used
  const otherApps = generateExternalRoutesConfig(apps);
  const otherAppFiles = Object.entries(otherApps).map(([appName, appConfig]) => generateAppFiles(appName, appConfig));

  // 3. Merge content of the files at the same directory path to make sure they are not being overwritten
  const allFiles = [...mainAppFiles, ...otherAppFiles].flat();
  const mergedFiles = allFiles.reduce<TemplateFile[]>((prevResult, file) => {
    if (!file) {
      return prevResult;
    }
    const newResult: TemplateFile[] = [...prevResult];
    const matchedIndex = newResult.findIndex(
      (resultFile) =>
        resultFile.destinationDir === file.destinationDir &&
        resultFile.extension === file.extension &&
        resultFile.filename === file.filename
    );
    if (matchedIndex > -1) {
      newResult[matchedIndex] = {
        ...newResult[matchedIndex],
        template: `${newResult[matchedIndex].template}${file.template}`,
      };
    } else {
      newResult.push({ ...file });
    }

    return [...newResult];
  }, []);

  return [...mergedFiles];
};

export default generate;
