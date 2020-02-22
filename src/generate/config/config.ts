export enum RoutingType {
  'NextJS' = 'NextJS',
  'ReactRouter' = 'ReactRouter',
  'Default' = 'Default',
}

export interface AppConfig {
  routes: Record<string, string>;
  routingType?: string;
  destinationDir?: string;
  reactRouterLinkCreator?: string;
  nextJSLinkCreator?: string;
  defaultLinkCreator?: string;
}

export interface ParsedAppConfig {
  routes: Record<string, string>;
  routingType: RoutingType;
  destinationDir?: string;
  reactRouterLinkCreator?: string;
  nextJSLinkCreator?: string;
  defaultLinkCreator?: string;
}

export interface Config {
  apps: Record<string, AppConfig>;
}

export const parseAppConfig = ({
  reactRouterLinkCreator = './createReactRouterLink',
  defaultLinkCreator = './createDefaultLink',
  nextJSLinkCreator = './createNextJSLink',
  routingType = 'Default',
  routes,
  destinationDir,
}: AppConfig): ParsedAppConfig => {
  if (
    routingType !== RoutingType.NextJS &&
    routingType !== RoutingType.ReactRouter &&
    routingType !== RoutingType.Default
  ) {
    throw new Error('Routing type of an app must be either "NextJS" or "ReactRouter" or "Default"');
  }

  const parsedConfig: ParsedAppConfig = {
    routes,
    destinationDir,
    routingType,
    reactRouterLinkCreator,
    defaultLinkCreator,
    nextJSLinkCreator,
  };

  return parsedConfig;
};
