import { AppConfig, AppRoute } from "../types";
import { Import, RawPlugin, TopLevelGenerateOptions } from "../../../utils";

export interface ParsedAppConfig {
  routes: Record<string, AppRoute>;
  destinationDir?: string;
  plugins: RawPlugin[];
  topLevelGenerateOptions: TopLevelGenerateOptions;
  importGenerateUrl: Import;
  importRedirectServerSide: Import;
}

// Note: these imports are constants at the moment but we could open it up so people can pass their own functions in
const IMPORT_GENERATE_URL: Import = {
  namedImports: [{ name: "generateUrl" }],
  from: "@route-codegen/utils",
};
const IMPORT_REDIRECT_SERVER_SIDE_COMPONENT: Import = {
  namedImports: [{ name: "RedirectServerSide" }],
  from: "@route-codegen/react",
};

/**
 * parseAppConfig is the function to turn config from the .yml file into typed config that the generators can use
 * @param appConfig The config that we get from .yml file. This will be parsed into approriate options
 */
export const parseAppConfig = (appConfig: AppConfig): ParsedAppConfig => {
  const { origin = "", routes = {}, destinationDir, generate, plugins } = appConfig;

  const topLevelGenerateOptions: TopLevelGenerateOptions = {
    generateLinkComponent: generate?.linkComponent || false,
    generateRedirectComponent: generate?.redirectComponent || false,
    generateUseParams: generate?.useParams || false,
    generateUseRedirect: generate?.useRedirect || false,
  };

  // Turn ALL routes into AppRoute i.e. with origin built in because it is needed when generating templates for external routes.
  // This is because when we are generating external routes for an app, each route belongs to a different app with different origin.
  const routesWithOrigin = Object.entries(routes).reduce<Record<string, AppRoute>>((prevRoutes, [appName, appRoute]) => {
    if (typeof appRoute === "string") {
      prevRoutes[appName] = { path: appRoute, origin, routingType: "route-internal" };
    } else if (typeof appRoute === "object") {
      prevRoutes[appName] = { path: appRoute.path, origin: appRoute.origin || origin, routingType: appRoute.routingType };
    }
    return prevRoutes;
  }, {});

  const parsedConfig: ParsedAppConfig = {
    routes: routesWithOrigin,
    destinationDir,
    plugins: plugins || [],
    topLevelGenerateOptions,
    importGenerateUrl: IMPORT_GENERATE_URL,
    importRedirectServerSide: IMPORT_REDIRECT_SERVER_SIDE_COMPONENT,
  };

  return parsedConfig;
};
