import { AppConfig, parseAppConfig } from "./../config";
import generateTemplateFiles from "./generateTemplateFiles";
import { info, pluginHelpers, TemplateFile } from "../../utils";
import { plugin } from "../../plugins/typescript-root-index"; // TODO: do this dynamically

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
    const pluginModules = await pluginHelpers.loadPluginModules(plugins);

    const files = await Promise.all(
      Object.entries(routes).map(([routeName, routePattern]) =>
        generateTemplateFiles({
          appName,
          topLevelGenerateOptions,
          origin: routePattern.origin,
          routePattern: routePattern.path,
          pluginModules,
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
      const rootIndexFiles = plugin.generate({ destinationDir, files: filesToGenerate });
      return [...filesToGenerate, ...rootIndexFiles];
    }

    return filesToGenerate;
  }

  info([appName], `*** No destinationDir. Not generating files ***\n`);

  return [];
};

export default generateAppFiles;
