import { Import } from '../types';

export enum RoutingType {
  'NextJS' = 'NextJS',
  'ReactRouterV5' = 'ReactRouterV5',
  'Default' = 'Default',
}

export interface AppConfig {
  routes?: Record<string, string>;
  routingType?: string;
  destinationDir?: string;
  reactRouterV5LinkOptions?: LinkOptions & { useRedirect?: boolean; useParams?: boolean };
  nextJSLinkOptions?: CustomLinkOptions;
  defaultLinkOptions?: CustomLinkOptions;
  generateLink?: boolean;
}

// TODO: all of the fields are optional
export interface CustomLinkOptions {
  path: string;
  hrefProp: string;
  propsInterfaceName: string;
}

interface LinkOptions {
  path?: string;
  hrefProp?: string;
  propsInterfaceName?: string;
}

export type RouteLinkOptionsNoGenerateDefault = {
  path: string;
  hrefProp: string;
  propsInterfaceName: string;
  shouldGenerateDefault: false;
};
export type RouteLinkOptionsGenerateDefault = { shouldGenerateDefault: true };

export type RouteLinkOptions = {
  NextJS: RouteLinkOptionsNoGenerateDefault | RouteLinkOptionsGenerateDefault;
  ReactRouterV5: ParsedReactRouterV5LinkOptions;
  Default: RouteLinkOptionsNoGenerateDefault | RouteLinkOptionsGenerateDefault;
};

export interface ParsedAppConfig {
  routes: Record<string, string>;
  routingType: RoutingType;
  destinationDir?: string;
  routeLinkOptions: RouteLinkOptions;
  importGenerateUrl: Import;
  shouldGenerateLink: boolean;
}

export interface Config {
  apps: Record<string, AppConfig>;
}

export interface ParsedReactRouterV5LinkOptions {
  path: string;
  hrefProp: string;
  propsInterfaceName: string;
  useRedirect: boolean;
  useParams: boolean;
}

const IMPORT_GENERATE_URL: Import = {
  namedImports: [{ name: 'generateUrl' }],
  from: 'route-codegen',
};
const defaultReactRouterV5LinkOptions: ParsedReactRouterV5LinkOptions = {
  path: 'react-router-dom',
  hrefProp: 'to',
  propsInterfaceName: 'LinkProps',
  useRedirect: true,
  useParams: true,
};

export const parseAppConfig = ({
  routingType = 'Default',
  routes = {},
  destinationDir,
  reactRouterV5LinkOptions = {},
  nextJSLinkOptions,
  defaultLinkOptions,
  generateLink = true,
}: AppConfig): ParsedAppConfig => {
  if (
    routingType !== RoutingType.NextJS &&
    routingType !== RoutingType.ReactRouterV5 &&
    routingType !== RoutingType.Default
  ) {
    throw new Error('Routing type of an app must be either "NextJS" or "ReactRouter" or "Default"');
  }

  const parsedConfig: ParsedAppConfig = {
    routes,
    destinationDir,
    routingType,
    routeLinkOptions: {
      ReactRouterV5: { ...defaultReactRouterV5LinkOptions, ...reactRouterV5LinkOptions },
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
    importGenerateUrl: IMPORT_GENERATE_URL,
    shouldGenerateLink: generateLink,
  };

  return parsedConfig;
};
