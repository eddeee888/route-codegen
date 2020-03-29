import { Import } from '../types';
import { RoutingType, AppConfig, ImportCustomLink } from '../config';
import throwError from '../utils/throwError';
import info from '../utils/info';

export interface ParsedReactRouterV5LinkOptions {
  importLink: Import;
  linkComponent: string;
  linkProps: string;
  hrefProp: string;
  useRedirect: boolean;
  useParams: boolean;
}

export interface ParsedNextJSLinkOptions {
  importLink: Import;
  linkComponent: string;
  linkProps: string;
  hrefProp: string;
}

export interface ParsedDefaultLinkOptions {
  importLink?: Import;
  linkProps?: string;
  inlineLinkProps?: {
    // inlineLinkProps is ONLY here when there's no importCustomLink is passed in
    template: string;
    linkProps: string;
  };
  linkComponent: string;
  hrefProp: string;
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

const IMPORT_GENERATE_URL: Import = {
  namedImports: [{ name: 'generateUrl' }],
  from: 'route-codegen',
};

const parseAppConfig = (
  appName: string,
  {
    routingType = RoutingType.Default,
    routes = {},
    destinationDir,
    reactRouterV5LinkOptions,
    nextJSLinkOptions,
    defaultLinkOptions,
    generateLink = true,
  }: AppConfig
): ParsedAppConfig => {
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

  const parsedConfig: ParsedAppConfig = {
    routes,
    destinationDir,
    routingType,
    routeLinkOptions: {
      ReactRouterV5: prepareReactRouterV5LinkOptions(appName, reactRouterV5LinkOptions),
      NextJS: prepareNextJSLinkOptions(appName, nextJSLinkOptions),
      Default: prepareDefaultLinkOptions(appName, defaultLinkOptions),
    },
    importGenerateUrl: IMPORT_GENERATE_URL,
    shouldGenerateLink: generateLink,
  };

  return parsedConfig;
};

const prepareReactRouterV5LinkOptions = (
  appName: string,
  options: AppConfig['reactRouterV5LinkOptions']
): ParsedReactRouterV5LinkOptions => {
  const defaultOptions: ParsedReactRouterV5LinkOptions = {
    importLink: {
      from: 'react-router-dom',
      namedImports: [{ name: 'LinkProps' }, { name: 'Link' }],
    },
    linkComponent: 'Link',
    linkProps: 'LinkProps',
    hrefProp: 'to',
    useRedirect: true,
    useParams: true,
  };

  if (!options) {
    info([appName, 'reactRouterV5LinkOptions'], 'custom options not found... Using default');
    return { ...defaultOptions };
  }

  if (!options.importCustomLink) {
    info([appName, 'reactRouterV5LinkOptions', 'importCustomLink'], 'custom options not found... Using default');
    return {
      ...defaultOptions,
      useParams: options.useParams !== undefined ? options.useParams : defaultOptions.useParams,
      useRedirect: options.useRedirect !== undefined ? options.useRedirect : defaultOptions.useRedirect,
    };
  }

  info([appName, 'reactRouterV5LinkOptions'], 'using custom link options');
  const { importLink, hrefProp, linkComponent, linkProps } = handleImportCustomLink(
    appName,
    'reactRouterV5LinkOptions',
    options.importCustomLink
  );

  return {
    importLink,
    linkComponent,
    hrefProp,
    linkProps,
    useParams: options.useParams !== undefined ? options.useParams : defaultOptions.useParams,
    useRedirect: options.useRedirect !== undefined ? options.useRedirect : defaultOptions.useRedirect,
  };
};

const prepareNextJSLinkOptions = (
  appName: string,
  options: AppConfig['nextJSLinkOptions']
): ParsedNextJSLinkOptions => {
  const defaultOptions: ParsedNextJSLinkOptions = {
    importLink: {
      from: 'next/link',
      defaultImport: 'Link',
      namedImports: [{ name: 'LinkProps' }],
    },
    linkComponent: 'Link',
    linkProps: 'LinkProps',
    hrefProp: 'href',
  };
  if (!options || !options.importCustomLink) {
    info([appName, 'nextJSLinkOptions'], 'custom options not found... Using default');
    return { ...defaultOptions };
  }

  info([appName, 'nextJSLinkOptions'], 'using custom link options');
  const { importLink, hrefProp, linkComponent, linkProps } = handleImportCustomLink(
    appName,
    'nextJSLinkOptions',
    options.importCustomLink
  );

  return {
    importLink,
    hrefProp,
    linkComponent,
    linkProps,
  };
};

const prepareDefaultLinkOptions = (
  appName: string,
  options: AppConfig['defaultLinkOptions']
): ParsedDefaultLinkOptions => {
  const defaultOptions: ParsedDefaultLinkOptions = {
    hrefProp: 'href',
    linkComponent: 'a',
    inlineLinkProps: {
      template: `type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, 'href'>`,
      linkProps: 'LinkProps',
    },
  };
  if (!options || !options.importCustomLink) {
    info([appName, 'defaultLinkOptions'], 'custom options not found... Using default');
    return { ...defaultOptions };
  }

  info([appName, 'defaultLinkOptions'], 'using custom link options');
  const { importLink, hrefProp, linkComponent, linkProps } = handleImportCustomLink(
    appName,
    'defaultLinkOptions',
    options.importCustomLink
  );

  return {
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
