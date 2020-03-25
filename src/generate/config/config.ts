import { Import } from '../types';

export enum RoutingType {
  'NextJS' = 'NextJS',
  'ReactRouterV5' = 'ReactRouterV5',
  'Default' = 'Default',
}

interface LinkOptions {
  path?: string;
  hrefProp?: string;
  propsInterfaceName?: string;
}

export interface AppConfig {
  routes?: Record<string, string>;
  routingType?: string;
  destinationDir?: string;
  reactRouterV5LinkOptions?: LinkOptions & { useRedirect?: boolean; useParams?: boolean };
  nextJSLinkOptions?: LinkOptions;
  defaultLinkOptions?: LinkOptions;
  generateLink?: boolean;
}

export interface ParsedReactRouterV5LinkOptions {
  path: string;
  hrefProp: string;
  linkComponent: string;
  propsInterfaceName: string;
  useRedirect: boolean;
  useParams: boolean;
}

export interface ParsedNextJSLinkOptions {
  path: string;
  hrefProp: string;
  linkComponent: string;
  propsInterfaceName: string;
}

export interface ParsedDefaultLinkOptions {
  path: string;
  inlineLinkPropsTemplate?: string; // This is ONLY when there's no option is passed in
  linkComponent: string;
  hrefProp: string;
  propsInterfaceName: string;
}

export type RouteLinkOptions = {
  NextJS: ParsedNextJSLinkOptions;
  ReactRouterV5: ParsedReactRouterV5LinkOptions;
  Default: ParsedDefaultLinkOptions;
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

const IMPORT_GENERATE_URL: Import = {
  namedImports: [{ name: 'generateUrl' }],
  from: 'route-codegen',
};
const defaultReactRouterV5LinkOptions: ParsedReactRouterV5LinkOptions = {
  path: 'react-router-dom',
  hrefProp: 'to',
  linkComponent: 'Link',
  propsInterfaceName: 'LinkProps',
  useRedirect: true,
  useParams: true,
};
const defaultNextJSLinkOptions: ParsedNextJSLinkOptions = {
  path: 'next/link',
  hrefProp: 'href',
  linkComponent: 'Link',
  propsInterfaceName: 'LinkProps',
};
const defaultNormalLinkOptions: ParsedDefaultLinkOptions = {
  path: '',
  hrefProp: 'href',
  propsInterfaceName: '',
  linkComponent: 'a',
  inlineLinkPropsTemplate: `type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, 'href'>;`,
};

export const parseAppConfig = ({
  routingType = 'Default',
  routes = {},
  destinationDir,
  reactRouterV5LinkOptions = {},
  nextJSLinkOptions = {},
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
      NextJS: { ...defaultNextJSLinkOptions, ...nextJSLinkOptions },
      Default: !defaultLinkOptions
        ? { ...defaultNormalLinkOptions }
        : { ...defaultNormalLinkOptions, ...defaultLinkOptions, inlineLinkPropsTemplate: undefined },
    },
    importGenerateUrl: IMPORT_GENERATE_URL,
    shouldGenerateLink: generateLink,
  };

  return parsedConfig;
};
