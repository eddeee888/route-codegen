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
  useRedirect: boolean;
  useParams: boolean;
}

export interface ParsedLinkOptionsNextJS {
  importLink: Import;
  linkComponent: string;
  linkProps: string;
  hrefProp: string;
  generateLinkComponent: boolean;
  useParams: boolean;
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
  useRedirect: boolean;
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
}

interface TopLevelGenerateOptions {
  generateLinkComponent: boolean;
  generateUseParams: boolean;
  generateUseRedirect: boolean;
}

const IMPORT_GENERATE_URL: Import = {
  namedImports: [{ name: 'generateUrl' }],
  from: 'route-codegen',
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
    useRedirect: topLevelGenerateOptions.generateUseRedirect,
    useParams: topLevelGenerateOptions.generateUseParams,
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
    useParams: getOverriddenValue(defaultOptions.useParams, routeLinkOptions.useParams),
    useRedirect: getOverriddenValue(defaultOptions.useRedirect, routeLinkOptions.useRedirect),
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
    useParams: topLevelGenerateOptions.generateUseParams,
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
    useParams: getOverriddenValue(defaultOptions.useParams, routeLinkOptions.useParams),
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
    useRedirect: topLevelGenerateOptions.generateUseRedirect,
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
    useRedirect: getOverriddenValue(defaultOptions.useRedirect, routeLinkOptions.useRedirect),
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
