export enum RoutingType {
  "NextJS" = "NextJS",
  "ReactRouterV5" = "ReactRouterV5",
  "Default" = "Default",
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
  generate?: {
    linkComponent?: boolean;
    redirectComponent?: boolean;
    useRedirect?: boolean;
    useParams?: boolean;
  };
  mode?: string;
}

// TODO: The Object version is only being used internally when generating external routes. Test if it's safe for users to use
export interface AppRoute {
  path: string;
  origin: string;
}

export interface AppConfig {
  origin?: string;
  routes?: Record<string, string | AppRoute>;
  routingType?: string;
  destinationDir?: string;
  reactRouterV5LinkOptions?: LinkOptions;
  nextJSLinkOptions?: LinkOptions;
  defaultLinkOptions?: LinkOptions;
  generate?: {
    linkComponent?: boolean;
    redirectComponent?: boolean;
    useParams?: boolean;
    useRedirect?: boolean;
    rootIndex?: boolean;
  };
}

export interface Config {
  apps: Record<string, AppConfig>;
}
