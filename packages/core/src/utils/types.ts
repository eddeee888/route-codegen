export type RoutingType = "route-internal" | "route-external";

export interface TemplateFile {
  template: string;
  filename: string;
  extension: string;
  destinationDir: string;
  hasDefaultExport: boolean;
  hasNamedExports: boolean;
  routeName: string;
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
