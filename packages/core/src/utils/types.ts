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
  patternNameNextJS?: string;
  pathParamsInterfaceName?: string;
  pathParamsInterfaceNameNextJS?: string;
  possiblePathParamsVariableName?: string;
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

export interface LinkOptions {
  importCustomLink?: ImportCustomLink;
  generate?: {
    linkComponent?: boolean;
    redirectComponent?: boolean;
    useRedirect?: boolean;
    useParams?: boolean;
  };
  mode?: string;
}

export type PluginConfigType = "pattern" | "general" | "route-internal" | "route-external" | "generated-files-processor";

export interface CodegenPlugin<C, R> {
  type: PluginConfigType;
  isNextJS?: boolean; // TODO: this is a hack and should be removed
  generate: (config: C) => R;
}

export interface GeneratedFilesProcessorPluginBaseConfig {
  destinationDir: string;
  files: TemplateFile[];
}
export interface GeneratedFilesProcessorCodegenPlugin<C = Record<string, unknown>>
  extends CodegenPlugin<GeneratedFilesProcessorPluginBaseConfig & C, TemplateFile[]> {
  type: "generated-files-processor";
}

export interface PatternPluginBaseConfig {
  origin: string;
  routeName: string;
  routingType: RoutingType;
  routePattern: string;
  destinationDir: string;

  linkOptionModeNextJS: "strict" | "loose" | undefined; // TODO: this is a hack and should be removed
}
export interface PatternCodegenPlugin<C = Record<string, unknown>> extends CodegenPlugin<PatternPluginBaseConfig & C, PatternTemplateFile> {
  type: "pattern";
}

export interface GeneralPluginBaseConfig {
  appName: string;
  routeName: string;
  routePattern: string;
  routeLinkOptions: LinkOptions;
  topLevelGenerateOptions: TopLevelGenerateOptions;
  destinationDir: string;
  patternNamedExports: PatternNamedExports;
  importGenerateUrl: Import;
  importRedirectServerSide: Import;
}
export interface GeneralCodegenPlugin<C = Record<string, unknown>> extends CodegenPlugin<GeneralPluginBaseConfig & C, TemplateFile[]> {
  type: "general" | "route-internal" | "route-external";
}
