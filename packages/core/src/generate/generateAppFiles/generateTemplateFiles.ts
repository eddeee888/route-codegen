import {
  TemplateFile,
  throwError,
  pluginHelpers,
  PluginModule,
  RoutingType,
  PatternTemplateFile,
  PatternPluginBaseConfig,
  WithExtraConfig,
  GeneralPluginBaseConfig,
  ParsedAppConfig,
} from "../../utils";

export interface GenerateTemplateFilesParams {
  context: ParsedAppConfig["context"];
  appName: string;
  origin: string;
  routeName: string;
  routePattern: string;
  routingType: RoutingType;
  pluginModules: PluginModule[];
  destinationDir: string;
}

export const generateTemplateFiles = async (params: GenerateTemplateFilesParams): Promise<TemplateFile[]> => {
  const { appName, context, origin, routeName, routePattern, pluginModules, destinationDir: originalDestinationDir, routingType } = params;

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

  const routePlugins = pluginHelpers.filterByTypes<WithExtraConfig<GeneralPluginBaseConfig>, TemplateFile[]>(pluginModules, [
    "general",
    routingType,
  ]);

  routePlugins.forEach(({ plugin, config }) => {
    const templateFiles = plugin.generate({
      context,
      appName,
      routeName,
      routePattern,
      destinationDir,
      patternNamedExports: patternFile.namedExports,
      extraConfig: config,
    });
    files.push(...templateFiles);
  });

  return files;
};
