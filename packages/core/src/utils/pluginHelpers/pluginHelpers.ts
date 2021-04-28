/**
 * Raw plugin config from reading yml
 */
export interface RawPluginConfig {
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
  config: RawPluginConfig["config"];
}

const findFirstOfType = (pluginModules: PluginModule[], type: PluginConfigType): PluginModule | undefined => {
  return pluginModules.find(({ plugin }) => plugin.type === type);
};

const filterByTypes = (pluginModules: PluginModule[], types: PluginConfigType[]): PluginModule[] => {
  return pluginModules.filter(({ plugin }) => types.includes(plugin.type));
};

export const pluginHelpers = { findFirstOfType, filterByTypes };
