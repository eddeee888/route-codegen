import {
  TemplateFile,
  Import,
  throwError,
  pluginHelpers,
  TopLevelGenerateOptions,
  PluginModule,
  RoutingType,
  PatternTemplateFile,
  PatternPluginBaseConfig,
  WithExtraConfig,
} from "../../utils";

export interface GenerateTemplateFilesParams {
  appName: string;
  origin: string;
  routeName: string;
  routePattern: string;
  routingType: RoutingType;
  topLevelGenerateOptions: TopLevelGenerateOptions;
  pluginModules: PluginModule[];
  destinationDir: string;
  importGenerateUrl: Import;
  importRedirectServerSide: Import;
}

const generateTemplateFiles = async (params: GenerateTemplateFilesParams): Promise<TemplateFile[]> => {
  const {
    appName,
    origin,
    routeName,
    routePattern,
    topLevelGenerateOptions,
    pluginModules,
    destinationDir: originalDestinationDir,
    importGenerateUrl,
    importRedirectServerSide,
    routingType,
  } = params;

  const destinationDir = `${originalDestinationDir}/${routeName}`;

  if (pluginModules.length === 0) {
    return [];
  }

  const patternPlugin = pluginHelpers.findFirstOfType<WithExtraConfig<PatternPluginBaseConfig>, PatternTemplateFile>(
    pluginModules,
    "pattern"
  );

  if (!patternPlugin) {
    return throwError([appName, routeName], "No pattern plugin found.");
  }

  const files: TemplateFile[] = [];

  const patternFile = patternPlugin.plugin.generate({
    origin,
    routingType,
    routeName,
    routePattern,
    destinationDir,
    extraConfig: patternPlugin.config,
  });
  files.push(patternFile);

  const routePlugins = pluginHelpers.filterByTypes(pluginModules, ["general", routingType]);

  routePlugins.forEach(({ plugin, config }) => {
    const templateFiles = plugin.generate({
      appName,
      origin,
      routeName,
      routePattern,
      destinationDir,
      patternNamedExports: patternFile.namedExports,
      topLevelGenerateOptions,
      importGenerateUrl,
      importRedirectServerSide,
      extraConfig: config,
    }) as TemplateFile[]; // TODO: type this better to scale
    files.push(...templateFiles);
  });

  return files;
};

export default generateTemplateFiles;
