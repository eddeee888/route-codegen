/**
 * Raw plugin config from reading yml
 */
export interface RawPlugin {
  name: string;
  type?: string;
  config?: Record<string, unknown>;
}

// TODO: The Object version is only being used internally when generating external routes.
// Test if it's safe for users to use
export interface AppRoute {
  path: string;
  origin: string;
  routingType?: RoutingType;
}

export interface ContextImport {
  importedName: string;
  import: Import;
}

export interface ParsedAppConfig {
  routes: Record<string, AppRoute>;
  destinationDir?: string;
  plugins: RawPlugin[];
  context: {
    topLevelGenerateOptions: TopLevelGenerateOptions;
    importGenerateUrl: ContextImport;
    importRedirectServerSide: ContextImport;
  };
}

export type RoutingType = "route-internal" | "route-external";

export interface TemplateFile {
  type?: "pattern";
  template: string;
  filename: string;
  extension: string;
  destinationDir: string;
  hasDefaultExport: boolean;
  hasNamedExports: boolean;
  routeName: string;
}

export interface PatternTemplateFile extends TemplateFile {
  type: "pattern";
  routingType: RoutingType;
  namedExports: PatternNamedExports;
  hasNamedExports: true;
}

export interface Import {
  defaultImport?: string;
  namedImports?: NamedImport[];
  from: string;
}

export interface NamedImport {
  name: string;
  importAs?: string;
}

export interface PatternNamedExports {
  originName: string;
  patternName: string;
  pathParamsInterfaceName?: string;
  urlParamsInterfaceName: string;
  filename: string;
}

export interface ImportCustomLink {
  componentDefaultImport?: boolean;
  componentNamedImport?: string;
  hrefProp?: string;
  propsNamedImport?: string;
  from?: string;
}

export interface TopLevelGenerateOptions {
  generateLinkComponent: boolean;
  generateRedirectComponent: boolean;
  generateUseParams: boolean;
  generateUseRedirect: boolean;
}

export type PluginConfigType = "pattern" | "general" | "route-internal" | "route-external" | "generated-files-processor";

export interface CodegenPlugin<C, R> {
  type: PluginConfigType;
  generate: (config: C) => R;
}

export type WithExtraConfig<B, E = Record<string, unknown>> = B & { extraConfig?: E };

export interface GeneratedFilesProcessorPluginBaseConfig {
  destinationDir: string;
  files: TemplateFile[];
}
export interface GeneratedFilesProcessorCodegenPlugin<C = Record<string, unknown>>
  extends CodegenPlugin<WithExtraConfig<GeneratedFilesProcessorPluginBaseConfig, C>, TemplateFile[]> {
  type: "generated-files-processor";
}

export interface PatternPluginBaseConfig {
  origin: string;
  routeName: string;
  routingType: RoutingType;
  routePattern: string;
  destinationDir: string;
}
export interface PatternCodegenPlugin<C = Record<string, unknown>>
  extends CodegenPlugin<WithExtraConfig<PatternPluginBaseConfig, C>, PatternTemplateFile> {
  type: "pattern";
}

export interface GeneralPluginBaseConfig {
  context: ParsedAppConfig["context"];
  appName: string;
  routeName: string;
  routePattern: string;
  destinationDir: string;
  patternNamedExports: PatternNamedExports;
}
export interface GeneralCodegenPlugin<C = Record<string, unknown>>
  extends CodegenPlugin<WithExtraConfig<GeneralPluginBaseConfig, C>, TemplateFile[]> {
  type: "general" | "route-internal" | "route-external";
}
