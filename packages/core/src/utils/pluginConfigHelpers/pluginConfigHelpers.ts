/**
 * Raw plugin config from reading yml
 */
export interface RawPluginConfig {
  name: string;
  type?: string;
  config?: Record<string, unknown>;
}

export interface ParsedPluginConfig {
  name: string;
  type: PluginConfigType;
  config?: Record<string, unknown>;
}

type PluginConfigType = "pattern" | "route";

const parse = (plugins: RawPluginConfig[]): ParsedPluginConfig[] => {
  return plugins.map((plugin) => {
    return {
      name: plugin.name,
      type: plugin.type === "route" ? "route" : "pattern",
      config: plugin.config,
    };
  });
};

const findFirstOfType = (plugins: ParsedPluginConfig[], type: PluginConfigType): ParsedPluginConfig | undefined => {
  return plugins.find((plugin) => plugin.type === type);
};

const filterByType = (plugins: ParsedPluginConfig[], type: PluginConfigType): ParsedPluginConfig[] => {
  return plugins.filter((plugin) => plugin.type === type);
};

export const pluginConfigHelpers = { findFirstOfType, parse, filterByType };
