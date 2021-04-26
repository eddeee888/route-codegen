export enum RoutingType {
  "NextJS" = "NextJS",
  "ReactRouterV5" = "ReactRouterV5",
  "Default" = "Default",
}

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
