import { RawPlugin } from "../../utils";

// RoutingType is used to only target "route-internal" and "route-external" plugins
// Normally codegen are run 2 times:
// - The first time runs "pattern", "route-internal" plugins
// - The second time run "route-external" plugins
export enum RoutingType {
  "route-internal" = "route-internal",
  "route-external" = "route-external",
}

export interface ImportCustomLink {
  componentDefaultImport?: boolean;
  componentNamedImport?: string;
  hrefProp?: string;
  propsNamedImport?: string;
  from?: string;
}

// TODO: The Object version is only being used internally when generating external routes. Test if it's safe for users to use
export interface AppRoute {
  path: string;
  origin: string;
}

export interface AppConfig {
  origin?: string;
  routes?: Record<string, string | AppRoute>;
  destinationDir?: string;
  generate?: {
    linkComponent?: boolean;
    redirectComponent?: boolean;
    useParams?: boolean;
    useRedirect?: boolean;
    rootIndex?: boolean;
  };
  plugins?: RawPlugin[];

  // Note: This is only for internal use
  _routingType?: string;
}

export interface Config {
  apps: Record<string, AppConfig>;
}
