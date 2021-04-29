/**
 * Raw plugin config from reading yml
 */
export interface RawPlugin {
  name: string;
  type?: string;
  config?: Record<string, unknown>;
}

export type PluginConfigType = "pattern" | "general" | "route-internal" | "route-external" | "files-processing";

export interface CodegenPlugin<C, R> {
  type: PluginConfigType;
  isNextJS?: boolean; // TODO: this is a hack and should be removed
  generate: (config: C) => R;
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

const findFirstOfType = (pluginModules: PluginModule[], type: PluginConfigType): PluginModule | undefined => {
  return pluginModules.find(({ plugin }) => plugin.type === type);
};

const filterByTypes = (pluginModules: PluginModule[], types: PluginConfigType[]): PluginModule[] => {
  return pluginModules.filter(({ plugin }) => types.includes(plugin.type));
};

export const pluginHelpers = { findFirstOfType, filterByTypes, resolvePluginPath, loadPluginModules };
