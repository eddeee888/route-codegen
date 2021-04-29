import { AppConfig, parseAppConfig } from "./../config";
import generateTemplateFiles from "./generateTemplateFiles";
import { info, pluginHelpers, TemplateFile, PluginModule } from "../../utils";

const generateAppFiles = async (appName: string, appConfig: AppConfig): Promise<TemplateFile[]> => {
  const { routes, destinationDir, plugins, importGenerateUrl, importRedirectServerSide, topLevelGenerateOptions } = parseAppConfig(
    appConfig
  );

  if (destinationDir) {
    const pluginModules = await pluginHelpers.loadPluginModules(plugins);

    const files = await Promise.all(
      Object.entries(routes).map(([routeName, routePattern]) =>
        generateTemplateFiles({
          appName,
          topLevelGenerateOptions,
          origin: routePattern.origin,
          routePattern: routePattern.path,
          routingType: routePattern.routingType || "route-internal",
          pluginModules,
          routeName,
          destinationDir,
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

    // TODO: handle this 'as' type better
    const generatedFileProcessors = pluginHelpers.filterByTypes(pluginModules, ["generated-files-processor"]) as PluginModule<
      any,
      TemplateFile[]
    >[];
    const extraFiles = generatedFileProcessors.reduce<TemplateFile[]>((prevFiles, { plugin }) => {
      const newFiles = plugin.generate({ destinationDir, files: filesToGenerate });
      return [...prevFiles, ...newFiles];
    }, []);

    return [...filesToGenerate, ...extraFiles];
  }

  info([appName], `*** No destinationDir. Not generating files ***\n`);

  return [];
};

export default generateAppFiles;
