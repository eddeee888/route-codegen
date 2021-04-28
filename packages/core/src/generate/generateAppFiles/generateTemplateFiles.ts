import { RoutingType } from "../config";
import {
  TemplateFile,
  Import,
  throwError,
  RawPluginConfig,
  pluginHelpers,
  TopLevelGenerateOptions,
  CodegenPlugin,
  PluginModule,
  BasePatternPluginConfig,
  BasePatternPluginResult,
  BasePluginResult,
} from "../../utils";

export interface GenerateTemplateFilesParams {
  appName: string;
  origin: string;
  routeName: string;
  routePattern: string;
  topLevelGenerateOptions: TopLevelGenerateOptions;
  plugins: RawPluginConfig[];
  destinationDir: string;
  importGenerateUrl: Import;
  importRedirectServerSide: Import;

  routingType: RoutingType; // TODO: handle this
}

const generateTemplateFiles = async (params: GenerateTemplateFilesParams): Promise<TemplateFile[]> => {
  const {
    appName,
    origin,
    routeName,
    routePattern,
    topLevelGenerateOptions,
    plugins,
    destinationDir: originalDestinationDir,
    importGenerateUrl,
    importRedirectServerSide,

    // TODO: handle this
    routingType,
  } = params;

  const destinationDir = `${originalDestinationDir}/${routeName}`;

  if (plugins.length === 0) {
    return [];
  }

  // TODO: handle this better e.g. import from node_modules?
  const resolvePluginPath = (pluginName: string): string => {
    return `../../plugins/${pluginName}`;
  };

  const pluginModules = await Promise.all<{ plugin: CodegenPlugin<unknown, unknown>; config: RawPluginConfig["config"] }>(
    plugins.map(async (plugin) => {
      return {
        plugin: await import(resolvePluginPath(plugin.name)),
        config: plugin.config,
      };
    })
  );

  // TODO: type this better to scale
  const patternPlugin = pluginHelpers.findFirstOfType(pluginModules, "pattern") as PluginModule<
    BasePatternPluginConfig,
    BasePatternPluginResult
  >;
  if (!patternPlugin) {
    return throwError([appName, routeName], "No pattern plugin found.");
  }

  const files: TemplateFile[] = [];

  const [patternFile, patternNamedExports] = patternPlugin.plugin.generate({
    origin,
    routeName,
    routePattern,
    destinationDir,
    routingType,

    linkOptionModeNextJS: "loose",
    // linkOptionModeNextJS: routeLinkOptions.NextJS.mode, TODO: handle this?
  });
  files.push(patternFile);

  const routePlugins = pluginHelpers.filterByType(pluginModules, "route");

  routePlugins.forEach(({ plugin, config }) => {
    const templateFiles = plugin.generate({
      appName,
      origin,
      routeName,
      routePattern,
      routeLinkOptions: config,
      topLevelGenerateOptions,
      destinationDir,
      patternNamedExports,
      importGenerateUrl,
      importRedirectServerSide,
    }) as BasePluginResult; // TODO: type this better to scale
    files.push(...templateFiles);
  });

  return files;
};

export default generateTemplateFiles;
