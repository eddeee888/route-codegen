/**
 * Raw plugin config from reading yml
 */
export interface RawPluginConfig {
  name: string;
  type?: string;
  config?: Record<string, unknown>;
}

export interface PluginModule<C = unknown, R = unknown> {
  plugin: CodegenPlugin<C, R>;
  config: RawPluginConfig["config"];
}

export type PluginConfigType = "pattern" | "route" | "files-processing";
export interface CodegenPlugin<C, R> {
  type: PluginConfigType;
  generate: (config: C) => R;
}

const findFirstOfType = (pluginModules: PluginModule[], type: PluginConfigType): PluginModule | undefined => {
  return pluginModules.find(({ plugin }) => plugin.type === type);
};

const filterByType = (pluginModules: PluginModule[], type: PluginConfigType): PluginModule[] => {
  return pluginModules.filter(({ plugin }) => plugin.type === type);
};

export const pluginHelpers = { findFirstOfType, filterByType };
