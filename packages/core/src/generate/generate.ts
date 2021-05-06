import { CodegenConfig, AppConfig } from "./parseAppConfig";
import { generateExternalRoutesConfig } from "./generateExternalRoutesConfig";
import { generateAppFiles } from "./generateAppFiles";
import { handleCommandFlags, CommandFlags, templateFileHelpers, TemplateFile } from "../utils";

export const generate = async (config: CodegenConfig, commandFlags: CommandFlags): Promise<void> => {
  handleCommandFlags(commandFlags);

  const { apps } = config;
  const filesToWrite = await generateFilesToWrite(apps);
  filesToWrite.forEach(templateFileHelpers.writeFile);
};

/**
 * Function to prepare all the files to be written to disk
 */
const generateFilesToWrite = async (apps: Record<string, AppConfig>): Promise<TemplateFile[]> => {
  // 1. Go and find check the routes that are outside of each app. These are called external routes
  const externalApps = generateExternalRoutesConfig(apps);
  const appsWithMergedRoutes = Object.entries(apps).reduce<Record<string, AppConfig>>((result, [appName, appConfig]) => {
    result[appName] = { ...appConfig, routes: { ...appConfig.routes, ...externalApps[appName].routes } };
    return result;
  }, {});

  // 2. Go through the apps and generate the main route files for an app i.e. routes that are immediately inside the app
  const appFilePromises = Object.entries(appsWithMergedRoutes).map(([appName, appConfig]) => generateAppFiles(appName, appConfig));

  // 3. Merge content of the files at the same directory path to make sure they are not being overwritten
  const allFiles = (await Promise.all(appFilePromises)).flat();
  const mergedFiles = allFiles.reduce<TemplateFile[]>((prevResult, file) => {
    if (!file) {
      return prevResult;
    }

    const newResult: TemplateFile[] = [...prevResult];
    const matchedIndex = newResult.findIndex((resultFile) => templateFileHelpers.samePath(resultFile, file));
    if (matchedIndex > -1) {
      newResult[matchedIndex] = templateFileHelpers.mergeTemplate(newResult[matchedIndex], file);
    } else {
      newResult.push({ ...file });
    }

    return [...newResult];
  }, []);

  return [...mergedFiles];
};
