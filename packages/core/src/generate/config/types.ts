import { RawPlugin, RoutingType } from "../../utils";

// TODO: The Object version is only being used internally when generating external routes. Test if it's safe for users to use
export interface AppRoute {
  path: string;
  origin: string;
  routingType?: RoutingType;
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
  };
  plugins?: RawPlugin[];
}

export interface Config {
  apps: Record<string, AppConfig>;
}
