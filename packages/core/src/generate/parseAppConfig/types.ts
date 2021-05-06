import { RawPlugin, AppRoute } from "../../utils";

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

export interface CodegenConfig {
  apps: Record<string, AppConfig>;
}
