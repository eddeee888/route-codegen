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
  routingType: RoutingType;
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
        plugin: (await import(resolvePluginPath(plugin.name))).plugin,
        config: plugin.config,
      };
    })
  );

  // TODO: this is a hack to inject NextJS pattern into pattern file and should be removed
  let linkOptionModeNextJS: "strict" | "loose" | undefined = undefined;
  const routeInternal = pluginHelpers.findFirstOfType(pluginModules, "route-internal") as PluginModule;
  if (routingType === RoutingType["route-internal"] && routeInternal.plugin.isNextJS) {
    linkOptionModeNextJS = routeInternal.config?.mode as "strict" | "loose" | undefined; // TODO: handle this!
  }

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
    linkOptionModeNextJS, // TODO: this is the NextJS pattern hack and should be removed
  });
  files.push(patternFile);

  const routePlugins = pluginHelpers.filterByTypes(pluginModules, ["general", routingType]);

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
