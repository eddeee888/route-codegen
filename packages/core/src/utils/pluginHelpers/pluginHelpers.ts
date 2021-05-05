import { CodegenPlugin, PluginConfigType } from "../types";

/**
 * Raw plugin config from reading yml
 */
export interface RawPlugin {
  name: string;
  type?: string;
  config?: Record<string, unknown>;
}

export interface PluginModule<C = unknown, R = unknown> {
  plugin: CodegenPlugin<C, R>;
  config: RawPlugin["config"];
}

// TODO: handle this better e.g. import from node_modules?
const resolvePluginPath = (pluginName: string): string => {
  return `../../plugins/${pluginName}`;
};

const loadPluginModules = async (plugins: RawPlugin[]): Promise<PluginModule[]> => {
  return await Promise.all<PluginModule>(
    plugins.map(async (plugin) => {
      return {
        plugin: (await import(resolvePluginPath(plugin.name))).plugin,
        config: plugin.config,
      };
    })
  );
};

const findFirstOfType = <C, R>(pluginModules: PluginModule[], type: PluginConfigType): PluginModule<C, R> | undefined => {
  return pluginModules.find(({ plugin }) => plugin.type === type) as PluginModule<C, R> | undefined;
};

const filterByTypes = <C, R>(pluginModules: PluginModule[], types: PluginConfigType[]): PluginModule<C, R>[] => {
  return pluginModules.filter(({ plugin }) => types.includes(plugin.type)) as PluginModule<C, R>[];
};

export const pluginHelpers = { findFirstOfType, filterByTypes, resolvePluginPath, loadPluginModules };
