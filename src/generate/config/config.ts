export enum RoutingType {
  'NextJS' = 'NextJS',
  'ReactRouter' = 'ReactRouter',
  'Default' = 'Default',
}

export interface AppConfig {
  routes: Record<string, string>;
  routingType?: string;
  destinationDir?: string;
  reactRouterRouteCreator?: string;
  externalRouteCreator?: string;
  nextJsRouteCreator?: string;
}

export interface ParsedAppConfig {
  routes: Record<string, string>;
  routingType: RoutingType;
  destinationDir?: string;
  reactRouterRouteCreator: string;
  nextJsRouteCreator: string;
  externalRouteCreator: string;
}

export interface Config {
  apps: Record<string, AppConfig>;
}

export const parseAppConfig = (appConfig: AppConfig): ParsedAppConfig => {
  const {
    reactRouterRouteCreator,
    externalRouteCreator,
    nextJsRouteCreator,
    routingType = 'Default',
    ...otherConfig
  } = appConfig;

  if (
    routingType !== RoutingType.NextJS &&
    routingType !== RoutingType.ReactRouter &&
    routingType !== RoutingType.Default
  ) {
    throw new Error('Routing type of an app must be either "NextJS" or "ReactRouter" or "Default"');
  }

  const parsedConfig = {
    ...otherConfig,
    routingType: routingType,
    reactRouterRouteCreator: reactRouterRouteCreator
      ? reactRouterRouteCreator
      : 'react-route-generator/routeCreators/createReactRouterRoute',
    externalRouteCreator: externalRouteCreator
      ? externalRouteCreator
      : 'react-route-generator/routeCreators/createExternalRoute',
    nextJsRouteCreator: nextJsRouteCreator
      ? nextJsRouteCreator
      : 'react-route-generator/routeCreators/createNextJsRoute',
  };

  return parsedConfig;
};
