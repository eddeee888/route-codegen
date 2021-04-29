import { RoutingType } from "../config";
import {
  TemplateFile,
  Import,
  throwError,
  pluginHelpers,
  TopLevelGenerateOptions,
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
  pluginModules: PluginModule[];
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

  // TODO: this is a hack to inject NextJS pattern into pattern file and should be removed
  let linkOptionModeNextJS: "strict" | "loose" | undefined = undefined;
  const routeInternal = pluginHelpers.findFirstOfType(pluginModules, "route-internal") as PluginModule | undefined;
  if (routingType === RoutingType["route-internal"] && routeInternal?.plugin.isNextJS) {
    linkOptionModeNextJS = (routeInternal.config?.mode || "loose") as "strict" | "loose"; // TODO: handle this!
  }

  // TODO: type this better to scale
  const patternPlugin = pluginHelpers.findFirstOfType(pluginModules, "pattern") as
    | PluginModule<BasePatternPluginConfig, BasePatternPluginResult>
    | undefined;
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
