export enum RoutingType {
  'NextJS' = 'NextJS',
  'ReactRouter' = 'ReactRouter',
  'Default' = 'Default',
}

export interface AppConfig {
  routes?: Record<string, string>;
  routingType?: string;
  destinationDir?: string;
  reactRouterLinkOptions?: CustomLinkOptions;
  nextJSLinkOptions?: CustomLinkOptions;
  defaultLinkOptions?: CustomLinkOptions;
  generateLink?: boolean;
  generateReactRouterFunctions?: boolean;
}

export interface CustomLinkOptions {
  path: string;
  hrefProp: string;
  propsInterfaceName: string;
}

export type RouteLinkOptionsNoGenerateDefault = {
  path: string;
  hrefProp: string;
  propsInterfaceName: string;
  shouldGenerateDefault: false;
};
export type RouteLinkOptionsGenerateDefault = { shouldGenerateDefault: true };

export type RouteLinkOptions = Record<RoutingType, RouteLinkOptionsNoGenerateDefault | RouteLinkOptionsGenerateDefault>;

export interface ParsedAppConfig {
  routes: Record<string, string>;
  routingType: RoutingType;
  destinationDir?: string;
  routeLinkOptions: RouteLinkOptions;
  generateUrlFunctionPath: string;
  shouldGenerateLink: boolean;
  shouldGenerateReactRouterFunctions: boolean;
}

export interface Config {
  apps: Record<string, AppConfig>;
}

const GENERATE_URL_PATH = 'route-codegen';

export const parseAppConfig = ({
  routingType = 'Default',
  routes = {},
  destinationDir,
  reactRouterLinkOptions,
  nextJSLinkOptions,
  defaultLinkOptions,
  generateLink = true,
  generateReactRouterFunctions = true,
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
    routeLinkOptions: {
      ReactRouter: reactRouterLinkOptions
        ? {
            shouldGenerateDefault: false,
            path: reactRouterLinkOptions.path,
            hrefProp: reactRouterLinkOptions.hrefProp,
            propsInterfaceName: reactRouterLinkOptions.propsInterfaceName,
          }
        : {
            shouldGenerateDefault: true,
          },
      NextJS: nextJSLinkOptions
        ? {
            shouldGenerateDefault: false,
            path: nextJSLinkOptions.path,
            hrefProp: nextJSLinkOptions.hrefProp,
            propsInterfaceName: nextJSLinkOptions.propsInterfaceName,
          }
        : { shouldGenerateDefault: true },
      Default: defaultLinkOptions
        ? {
            shouldGenerateDefault: false,
            path: defaultLinkOptions.path,
            hrefProp: defaultLinkOptions.hrefProp,
            propsInterfaceName: defaultLinkOptions.propsInterfaceName,
          }
        : { shouldGenerateDefault: true },
    },
    generateUrlFunctionPath: GENERATE_URL_PATH,
    shouldGenerateLink: generateLink,
    shouldGenerateReactRouterFunctions: generateReactRouterFunctions,
  };

  return parsedConfig;
};
