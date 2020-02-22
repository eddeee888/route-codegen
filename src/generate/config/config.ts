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
}

export type RouteLinkCreators = Record<RoutingType, { path: string; shouldGenerateDefault: boolean }>;

export interface ParsedAppConfig {
  routes: Record<string, string>;
  routingType: RoutingType;
  destinationDir?: string;
  routeLinkCreators: RouteLinkCreators;
  generateUrlFunctionPath: string;
}

export interface Config {
  apps: Record<string, AppConfig>;
}

const REACT_ROUTER_LINK_CREATOR_PATH = './createReactRouterLink';
const DEFAULT_LINK_CREATOR_PATH = './createDefaultLink';
const NEXTJS_LINK_CREATOR_PATH = './createNextJSLink';
const GENERATE_URL_PATH = './generateUrl';

export const parseAppConfig = ({
  reactRouterLinkCreatorPath,
  defaultLinkCreatorPath,
  nextJSLinkCreatorPath,
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
    routeLinkCreators: {
      ReactRouter: reactRouterLinkCreatorPath
        ? { path: reactRouterLinkCreatorPath, shouldGenerateDefault: false }
        : { path: REACT_ROUTER_LINK_CREATOR_PATH, shouldGenerateDefault: true },
      NextJS: nextJSLinkCreatorPath
        ? { path: nextJSLinkCreatorPath, shouldGenerateDefault: false }
        : { path: NEXTJS_LINK_CREATOR_PATH, shouldGenerateDefault: true },
      Default: defaultLinkCreatorPath
        ? { path: defaultLinkCreatorPath, shouldGenerateDefault: false }
        : { path: DEFAULT_LINK_CREATOR_PATH, shouldGenerateDefault: true },
    },
    generateUrlFunctionPath: GENERATE_URL_PATH,
  };

  return parsedConfig;
};
