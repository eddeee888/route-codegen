import { Import } from "../../types";
import { RoutingType, AppConfig, AppRoute } from "../types";
import { throwError } from "../../utils";
import { TopLevelGenerateOptions, RouteLinkOptions } from "./types";
import { prepareLinkOptionsReactRouterV5 } from "./prepareLinkOptionsReactRouterV5";
import { prepareLinkOptionsNextJS } from "./prepareLinkOptionsNextJS";
import { prepareLinkOptionsDefault } from "./prepareLinkOptionsDefault";

export interface ParsedAppConfig {
  routes: Record<string, AppRoute>;
  routingType: RoutingType;
  destinationDir?: string;
  routeLinkOptions: RouteLinkOptions;
  importGenerateUrl: Import;
  importRedirectServerSide: Import;
  generateRootIndex: boolean;
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
 * @param appName The name of an app we want to generate the route modules for
 * @param appConfig The config that we get from .yml file. This will be parsed into approriate options
 */
export const parseAppConfig = (appName: string, appConfig: AppConfig): ParsedAppConfig => {
  const {
    routingType = RoutingType.Default,
    origin = "",
    routes = {},
    destinationDir,
    reactRouterV5LinkOptions,
    nextJSLinkOptions,
    defaultLinkOptions,
    generate,
  } = appConfig;

  if (routingType !== RoutingType.NextJS && routingType !== RoutingType.ReactRouterV5 && routingType !== RoutingType.Default) {
    return throwError(
      [appName, "routingType"],
      `Routing type of an app must be either "${RoutingType.NextJS}" or "${RoutingType.ReactRouterV5}" or "${RoutingType.Default}"`
    );
  }

  const topLevelGenerateOptions: TopLevelGenerateOptions = {
    generateLinkComponent: generate?.linkComponent ?? true,
    generateRedirectComponent: generate?.redirectComponent ?? true,
    generateUseParams: generate?.useParams ?? true,
    generateUseRedirect: generate?.useRedirect ?? true,
  };

  // Turn ALL routes into AppRoute i.e. with origin built in because it is needed when generating templates for external routes.
  // This is because when we are generating external routes for an app, each route belongs to a different app with different origin.
  const routesWithOrigin = Object.entries(routes).reduce<Record<string, AppRoute>>((prevRoutes, [appName, appRoute]) => {
    if (typeof appRoute === "string") {
      prevRoutes[appName] = { path: appRoute, origin };
    } else if (typeof appRoute === "object") {
      prevRoutes[appName] = { path: appRoute.path, origin: appRoute.origin || origin };
    }
    return prevRoutes;
  }, {});

  const parsedConfig: ParsedAppConfig = {
    routes: routesWithOrigin,
    destinationDir,
    routingType,
    routeLinkOptions: {
      ReactRouterV5: prepareLinkOptionsReactRouterV5({
        appName,
        routeLinkOptions: reactRouterV5LinkOptions,
        topLevelGenerateOptions,
      }),
      NextJS: prepareLinkOptionsNextJS({ appName, routeLinkOptions: nextJSLinkOptions, topLevelGenerateOptions }),
      Default: prepareLinkOptionsDefault({ appName, routeLinkOptions: defaultLinkOptions, topLevelGenerateOptions }),
    },
    importGenerateUrl: IMPORT_GENERATE_URL,
    importRedirectServerSide: IMPORT_REDIRECT_SERVER_SIDE_COMPONENT,
    generateRootIndex: generate?.rootIndex ?? false,
  };

  return parsedConfig;
};
