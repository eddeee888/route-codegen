export enum RoutingType {
  'NextJS' = 'NextJS',
  'ReactRouter' = 'ReactRouter',
  'Default' = 'Default',
}

export interface AppConfig {
  routes: Record<string, string>;
  routingType?: string;
  destinationDir?: string;
  reactRouterLinkCreatorPath?: string;
  nextJSLinkCreatorPath?: string;
  defaultLinkCreatorPath?: string;
  generateUrlFunctionPath?: string;
}

export interface ParsedAppConfig {
  routes: Record<string, string>;
  routingType: RoutingType;
  destinationDir?: string;
  reactRouterLinkCreatorPath: string;
  nextJSLinkCreatorPath: string;
  defaultLinkCreatorPath: string;
  generateUrlFunctionPath: string;
  useDefaultGenerateUrlFunction: boolean;
}

export interface Config {
  apps: Record<string, AppConfig>;
}

const REACT_ROUTER_LINK_CREATOR_PATH = './createReactRouterLink';
const DEFAULT_LINK_CREATOR_PATH = './createDefaultLink';
const NEXTJS_LINK_CREATOR_PATH = './createNextJSLink';
const GENERATE_URL_PATH = './generateUrl';

export const parseAppConfig = ({
  reactRouterLinkCreatorPath = REACT_ROUTER_LINK_CREATOR_PATH,
  defaultLinkCreatorPath = DEFAULT_LINK_CREATOR_PATH,
  nextJSLinkCreatorPath = NEXTJS_LINK_CREATOR_PATH,
  routingType = 'Default',
  routes,
  destinationDir,
  generateUrlFunctionPath,
}: AppConfig): ParsedAppConfig => {
  if (
    routingType !== RoutingType.NextJS &&
    routingType !== RoutingType.ReactRouter &&
    routingType !== RoutingType.Default
  ) {
    throw new Error('Routing type of an app must be either "NextJS" or "ReactRouter" or "Default"');
  }

  let parsedGenerateUrlFunctionPath = GENERATE_URL_PATH;
  let useDefaultGenerateUrlFunction = true;
  if (!!generateUrlFunctionPath) {
    parsedGenerateUrlFunctionPath = generateUrlFunctionPath;
    useDefaultGenerateUrlFunction = false;
  }

  const parsedConfig: ParsedAppConfig = {
    routes,
    destinationDir,
    routingType,
    reactRouterLinkCreatorPath,
    defaultLinkCreatorPath,
    nextJSLinkCreatorPath,
    generateUrlFunctionPath: parsedGenerateUrlFunctionPath,
    useDefaultGenerateUrlFunction,
  };

  return parsedConfig;
};
