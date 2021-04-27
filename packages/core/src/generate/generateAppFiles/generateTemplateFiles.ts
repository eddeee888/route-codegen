import { RoutingType } from "../config";
import {
  TemplateFile,
  Import,
  throwError,
  RawPluginConfig,
  pluginConfigHelpers,
  BasePlugin,
  TopLevelGenerateOptions,
  ParsedPluginConfig,
  CodegenPlugin,
  BasePatternPluginConfig,
  BasePatternPluginResult,
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

  const parsedPlugins = pluginConfigHelpers.parse(plugins);

  const patternPlugin = pluginConfigHelpers.findFirstOfType(parsedPlugins, "pattern");
  if (!patternPlugin) {
    return throwError([routeName], "No pattern plugin found.");
  }

  // TODO: handle this better
  const resolvePluginPath = (pluginName: string): string => {
    return `../../plugins/${pluginName}`;
  };

  const files: TemplateFile[] = [];

  const PatternPlugin = (await import(resolvePluginPath(patternPlugin.name))) as CodegenPlugin<
    BasePatternPluginConfig,
    BasePatternPluginResult
  >;

  const [patternFile, patternNamedExports] = PatternPlugin.generate({
    origin,
    routeName,
    routePattern,
    destinationDir,
    routingType,

    linkOptionModeNextJS: "loose",
    // linkOptionModeNextJS: routeLinkOptions.NextJS.mode, TODO: handle this?
  });
  files.push(patternFile);

  const routePlugins = await Promise.all(
    pluginConfigHelpers
      .filterByType(parsedPlugins, "route")
      .map<Promise<{ RoutePlugin: typeof BasePlugin; config: ParsedPluginConfig["config"] }>>(async (plugin) => {
        return {
          RoutePlugin: await import(resolvePluginPath(plugin.name)),
          config: plugin.config,
        };
      })
  );
  routePlugins.forEach(({ RoutePlugin, config }) => {
    const templateFiles = new RoutePlugin({
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
    }).generate();
    files.push(...templateFiles);
  });

  return files;
};

export default generateTemplateFiles;
