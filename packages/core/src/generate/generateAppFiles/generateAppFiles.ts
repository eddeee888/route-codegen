import { AppConfig, parseAppConfig } from "./../config";
import generateTemplateFiles from "./generateTemplateFiles";
import { info, TemplateFile } from "../../utils";
import TypescriptRootIndexPlugin from "../../plugins/typescript-root-index";

const generateAppFiles = async (appName: string, appConfig: AppConfig): Promise<TemplateFile[]> => {
  const {
    routes,
    routingType,
    destinationDir,
    plugins,
    importGenerateUrl,
    importRedirectServerSide,
    topLevelGenerateOptions,
  } = parseAppConfig(appName, appConfig);

  if (destinationDir) {
    const files = await Promise.all(
      Object.entries(routes).map(([routeName, routePattern]) =>
        generateTemplateFiles({
          appName,
          topLevelGenerateOptions,
          origin: routePattern.origin,
          routePattern: routePattern.path,
          plugins,
          routeName,
          destinationDir,
          routingType,
          importGenerateUrl,
          importRedirectServerSide,
        })
      )
    );
    const filesToGenerate = files.flat();

    if (filesToGenerate.length > 0) {
      info(
        [appName],
        `*** Generating files ***\n${filesToGenerate.map((file) => `${file.destinationDir}${file.filename}${file.extension}`).join("\n")}\n`
      );
    } else {
      info([appName], `*** No files to generate ***\n`);
    }

    if (topLevelGenerateOptions.generateRootIndex) {
      const rootIndexFile = new TypescriptRootIndexPlugin({ destinationDir, files: filesToGenerate }).generate();
      if (rootIndexFile) {
        return [...filesToGenerate, rootIndexFile];
      }
      return [...filesToGenerate];
    }

    return filesToGenerate;
  }

  info([appName], `*** No destinationDir. Not generating files ***\n`);

  return [];
};

export default generateAppFiles;
