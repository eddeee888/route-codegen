import { Import } from '../types';
import { RoutingType, AppConfig, ImportCustomLink } from '../config';
import throwError from '../utils/throwError';
import info from '../utils/info';
import getOverriddenValue from '../utils/getOverriddenValue';

export interface ParsedLinkOptionsReactRouterV5 {
  importLink: Import;
  linkComponent: string;
  linkProps: string;
  hrefProp: string;
  generateLinkComponent: boolean;
  generateRedirectComponent: boolean;
  generateUseRedirect: boolean;
  generateUseParams: boolean;
}

export interface ParsedLinkOptionsNextJS {
  importLink: Import;
  linkComponent: string;
  linkProps: string;
  hrefProp: string;
  generateLinkComponent: boolean;
  generateUseParams: boolean;
}

export interface ParsedLinkOptionsDefault {
  importLink?: Import;
  linkProps?: string;
  inlineLinkProps?: {
    // inlineLinkProps is ONLY here when there's no importCustomLink is passed in
    template: string;
    linkProps: string;
  };
  linkComponent: string;
  hrefProp: string;
  generateLinkComponent: boolean;
  generateRedirectComponent: boolean;
  generateUseRedirect: boolean;
}

export type RouteLinkOptions = {
  NextJS: ParsedLinkOptionsNextJS;
  ReactRouterV5: ParsedLinkOptionsReactRouterV5;
  Default: ParsedLinkOptionsDefault;
};

export interface ParsedAppConfig {
  routes: Record<string, string>;
  routingType: RoutingType;
  destinationDir?: string;
  routeLinkOptions: RouteLinkOptions;
  importGenerateUrl: Import;
  importRedirectServerSide: Import;
}

interface TopLevelGenerateOptions {
  generateLinkComponent: boolean;
  generateRedirectComponent: boolean;
  generateUseParams: boolean;
  generateUseRedirect: boolean;
}

// Note: these imports are constants at the moment but we could open it up so people can pass their own functions in
const IMPORT_GENERATE_URL: Import = {
  namedImports: [{ name: 'generateUrl' }],
  from: 'route-codegen',
};
const IMPORT_REDIRECT_SERVER_SIDE_COMPONENT: Import = {
  defaultImport: 'RedirectServerSide',
  from: 'route-codegen/RedirectServerSide',
};

const parseAppConfig = (appName: string, appConfig: AppConfig): ParsedAppConfig => {
  const {
    routingType = RoutingType.Default,
    routes = {},
    destinationDir,
    reactRouterV5LinkOptions,
    nextJSLinkOptions,
    defaultLinkOptions,
    generateLinkComponent = true,
    generateRedirectComponent = true,
    generateUseParams = true,
    generateUseRedirect = true,
  } = appConfig;

  if (
    routingType !== RoutingType.NextJS &&
    routingType !== RoutingType.ReactRouterV5 &&
    routingType !== RoutingType.Default
  ) {
    return throwError(
      [appName, 'routingType'],
      `Routing type of an app must be either "${RoutingType.NextJS}" or "${RoutingType.ReactRouterV5}" or "${RoutingType.Default}"`
    );
  }

  const topLevelGenerateOptions: TopLevelGenerateOptions = {
    generateLinkComponent,
    generateRedirectComponent,
    generateUseParams,
    generateUseRedirect,
  };

  const parsedConfig: ParsedAppConfig = {
    routes,
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
  };

  return parsedConfig;
};

interface PrepareLinkOptionsParams<P> {
  appName: string;
  routeLinkOptions: P;
  topLevelGenerateOptions: TopLevelGenerateOptions;
}

const prepareLinkOptionsReactRouterV5 = (
  params: PrepareLinkOptionsParams<AppConfig['reactRouterV5LinkOptions']>
): ParsedLinkOptionsReactRouterV5 => {
  const { appName, routeLinkOptions, topLevelGenerateOptions } = params;

  const defaultOptions: ParsedLinkOptionsReactRouterV5 = {
    importLink: {
      from: 'react-router-dom',
      namedImports: [{ name: 'LinkProps' }, { name: 'Link' }],
    },
    linkComponent: 'Link',
    linkProps: 'LinkProps',
    hrefProp: 'to',
    generateLinkComponent: topLevelGenerateOptions.generateLinkComponent,
    generateRedirectComponent: topLevelGenerateOptions.generateRedirectComponent,
    generateUseRedirect: topLevelGenerateOptions.generateUseRedirect,
    generateUseParams: topLevelGenerateOptions.generateUseParams,
  };

  if (!routeLinkOptions) {
    info([appName, 'reactRouterV5LinkOptions'], 'custom options not found... Using default');
    return { ...defaultOptions };
  }

  const result: ParsedLinkOptionsReactRouterV5 = {
    ...defaultOptions,
    generateLinkComponent: getOverriddenValue(
      defaultOptions.generateLinkComponent,
      routeLinkOptions.generateLinkComponent
    ),
    generateRedirectComponent: getOverriddenValue(
      defaultOptions.generateRedirectComponent,
      routeLinkOptions.generateRedirectComponent
    ),
    generateUseParams: getOverriddenValue(defaultOptions.generateUseParams, routeLinkOptions.generateUseParams),
    generateUseRedirect: getOverriddenValue(defaultOptions.generateUseRedirect, routeLinkOptions.generateUseRedirect),
  };

  if (!routeLinkOptions.importCustomLink) {
    info([appName, 'reactRouterV5LinkOptions', 'importCustomLink'], 'custom options not found... Using default');
    return { ...result };
  }

  info([appName, 'reactRouterV5LinkOptions'], 'using custom link options');
  const { importLink, hrefProp, linkComponent, linkProps } = handleImportCustomLink(
    appName,
    'reactRouterV5LinkOptions',
    routeLinkOptions.importCustomLink
  );

  return {
    ...result,
    importLink,
    linkComponent,
    hrefProp,
    linkProps,
  };
};

const prepareLinkOptionsNextJS = (
  params: PrepareLinkOptionsParams<AppConfig['nextJSLinkOptions']>
): ParsedLinkOptionsNextJS => {
  const { appName, routeLinkOptions, topLevelGenerateOptions } = params;

  const defaultOptions: ParsedLinkOptionsNextJS = {
    importLink: {
      from: 'next/link',
      defaultImport: 'Link',
      namedImports: [{ name: 'LinkProps' }],
    },
    linkComponent: 'Link',
    linkProps: 'LinkProps',
    hrefProp: 'href',
    generateLinkComponent: topLevelGenerateOptions.generateLinkComponent,
    generateUseParams: topLevelGenerateOptions.generateUseParams,
  };
  if (!routeLinkOptions) {
    info([appName, 'nextJSLinkOptions'], 'custom options not found... Using default');
    return { ...defaultOptions };
  }

  const result: ParsedLinkOptionsNextJS = {
    ...defaultOptions,
    generateLinkComponent: getOverriddenValue(
      defaultOptions.generateLinkComponent,
      routeLinkOptions.generateLinkComponent
    ),
    generateUseParams: getOverriddenValue(defaultOptions.generateUseParams, routeLinkOptions.generateUseParams),
  };

  if (!routeLinkOptions.importCustomLink) {
    info([appName, 'nextJSLinkOptions', 'importCustomLink'], 'custom options not found... Using default');
    return { ...result };
  }

  info([appName, 'nextJSLinkOptions'], 'using custom link options');
  const { importLink, hrefProp, linkComponent, linkProps } = handleImportCustomLink(
    appName,
    'nextJSLinkOptions',
    routeLinkOptions.importCustomLink
  );

  return {
    ...result,
    importLink,
    hrefProp,
    linkComponent,
    linkProps,
  };
};

const prepareLinkOptionsDefault = (
  params: PrepareLinkOptionsParams<AppConfig['defaultLinkOptions']>
): ParsedLinkOptionsDefault => {
  const { appName, routeLinkOptions, topLevelGenerateOptions } = params;

  const defaultOptions: ParsedLinkOptionsDefault = {
    hrefProp: 'href',
    linkComponent: 'a',
    inlineLinkProps: {
      template: `type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, 'href'>`,
      linkProps: 'LinkProps',
    },
    generateLinkComponent: topLevelGenerateOptions.generateLinkComponent,
    generateUseRedirect: topLevelGenerateOptions.generateUseRedirect,
    generateRedirectComponent: topLevelGenerateOptions.generateRedirectComponent,
  };

  if (!routeLinkOptions) {
    info([appName, 'defaultLinkOptions'], 'custom options not found... Using default');
    return { ...defaultOptions };
  }

  const result: ParsedLinkOptionsDefault = {
    ...defaultOptions,
    generateLinkComponent: getOverriddenValue(
      defaultOptions.generateLinkComponent,
      routeLinkOptions.generateLinkComponent
    ),
    generateRedirectComponent: getOverriddenValue(
      defaultOptions.generateRedirectComponent,
      routeLinkOptions.generateRedirectComponent
    ),
    generateUseRedirect: getOverriddenValue(defaultOptions.generateUseRedirect, routeLinkOptions.generateUseRedirect),
  };

  if (!routeLinkOptions.importCustomLink) {
    info([appName, 'defaultLinkOptions', 'importCustomLink'], 'custom options not found... Using default');
    return { ...result };
  }

  info([appName, 'defaultLinkOptions'], 'using custom link options');
  const { importLink, hrefProp, linkComponent, linkProps } = handleImportCustomLink(
    appName,
    'defaultLinkOptions',
    routeLinkOptions.importCustomLink
  );

  return {
    ...result,
    inlineLinkProps: undefined, // If we import custom link props, do not use the default inline prop
    importLink,
    hrefProp,
    linkComponent,
    linkProps,
  };
};

const handleImportCustomLink = (
  appName: string,
  linkOptionName: string,
  importCustomLink: ImportCustomLink
): { importLink: Import; hrefProp: string; linkComponent: string; linkProps: string } => {
  const errorPath = [appName, linkOptionName, 'importCustomLink'];
  const { from, componentDefaultImport, componentNamedImport, propsNamedImport, hrefProp } = importCustomLink;
  if (!from) {
    return throwError(errorPath, '"from" is required');
  }
  if (!componentNamedImport && !componentDefaultImport) {
    return throwError(errorPath, 'either "componentNamedImport" or "componentDefaultImport" is required');
  }
  if (!propsNamedImport) {
    return throwError(errorPath, '"propsNamedImport" is required');
  }
  if (!hrefProp) {
    return throwError(errorPath, '"hrefProp" is required');
  }
  if (componentNamedImport && componentDefaultImport) {
    info(
      errorPath,
      '"componentNamedImport" and "componentDefaultImport" are supplied. "componentDefaultImport" will be used'
    );
  }

  const linkComponent = 'Link';

  const finalImportCustomLink: Import = componentNamedImport
    ? {
        from,
        namedImports: [{ name: propsNamedImport }, { name: componentNamedImport, importAs: linkComponent }],
      }
    : {
        from,
        defaultImport: linkComponent,
        namedImports: [{ name: propsNamedImport }],
      };

  return { importLink: finalImportCustomLink, hrefProp, linkComponent, linkProps: propsNamedImport };
};

export default parseAppConfig;
