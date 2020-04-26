export enum RoutingType {
  'NextJS' = 'NextJS',
  'ReactRouterV5' = 'ReactRouterV5',
  'Default' = 'Default',
}

export interface ImportCustomLink {
  componentDefaultImport?: boolean;
  componentNamedImport?: string;
  hrefProp?: string;
  propsNamedImport?: string;
  from?: string;
}

interface LinkOptions {
  importCustomLink?: ImportCustomLink;
  generateLinkComponent?: boolean;
  generateRedirectComponent?: boolean;
  generateUseRedirect?: boolean;
  generateUseParams?: boolean;
}

export interface AppConfig {
  routes?: Record<string, string>;
  routingType?: string;
  destinationDir?: string;
  reactRouterV5LinkOptions?: LinkOptions;
  nextJSLinkOptions?: LinkOptions;
  defaultLinkOptions?: LinkOptions;
  generateLinkComponent?: boolean;
  generateRedirectComponent?: boolean;
  generateUseParams?: boolean;
  generateUseRedirect?: boolean;
}

export interface Config {
  apps: Record<string, AppConfig>;
}
