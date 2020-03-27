import { Import } from '../types';
import { RoutingType, AppConfig, ImportCustomLink } from './config';

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

export const parseAppConfig = ({
  routingType = 'Default',
  routes = {},
  destinationDir,
  reactRouterV5LinkOptions,
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
      ReactRouterV5: prepareReactRouterV5LinkOptions(reactRouterV5LinkOptions),
      NextJS: prepareNextJSLinkOptions(nextJSLinkOptions),
      Default: prepareDefaultLinkOptions(defaultLinkOptions),
    },
    importGenerateUrl: IMPORT_GENERATE_URL,
    shouldGenerateLink: generateLink,
  };

  return parsedConfig;
};

const prepareReactRouterV5LinkOptions = (
  options: AppConfig['reactRouterV5LinkOptions']
): ParsedReactRouterV5LinkOptions => {
  const defaultOptions: ParsedReactRouterV5LinkOptions = {
    importLink: {
      from: 'react-router-dom',
      defaultImport: 'Link',
      namedImports: [{ name: 'LinkProps' }],
    },
    linkComponent: 'Link',
    linkProps: 'LinkProps',
    hrefProp: 'to',
    useRedirect: true,
    useParams: true,
  };

  if (!options) {
    return { ...defaultOptions };
  }

  if (!options.importCustomLink) {
    return {
      ...defaultOptions,
      useParams: options.useParams !== undefined ? options.useParams : defaultOptions.useParams,
      useRedirect: options.useRedirect !== undefined ? options.useRedirect : defaultOptions.useRedirect,
    };
  }

  const { importLink, hrefProp, linkComponent, linkProps } = handleImportCustomLink(
    RoutingType.ReactRouterV5,
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

const prepareNextJSLinkOptions = (options: AppConfig['nextJSLinkOptions']): ParsedNextJSLinkOptions => {
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
    return { ...defaultOptions };
  }

  const { importLink, hrefProp, linkComponent, linkProps } = handleImportCustomLink(
    RoutingType.NextJS,
    options.importCustomLink
  );

  return {
    importLink,
    hrefProp,
    linkComponent,
    linkProps,
  };
};

const prepareDefaultLinkOptions = (options: AppConfig['defaultLinkOptions']): ParsedDefaultLinkOptions => {
  const defaultOptions: ParsedDefaultLinkOptions = {
    hrefProp: 'href',
    linkComponent: 'a',
    inlineLinkProps: {
      template: `type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, 'href'>;`,
      linkProps: 'LinkProps',
    },
  };
  if (!options || !options.importCustomLink) {
    return { ...defaultOptions };
  }

  const { importLink, hrefProp, linkComponent, linkProps } = handleImportCustomLink(
    RoutingType.Default,
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
  routingType: RoutingType,
  importCustomLink: ImportCustomLink
): { importLink: Import; hrefProp: string; linkComponent: string; linkProps: string } => {
  const { from, componentDefaultImport, componentNamedImport, propsNamedImport, hrefProp } = importCustomLink;
  if (!from) {
    throw new Error(`${routingType} - importCustomLink - "from" is required`);
  }
  if (!componentNamedImport && !componentDefaultImport) {
    throw new Error(
      `${routingType} - importCustomLink - either "componentNamedImport" or "componentDefaultImport" is required`
    );
  }
  if (!propsNamedImport) {
    throw new Error(`${routingType} - importCustomLink - "propsNamedImport is required`);
  }
  if (!hrefProp) {
    throw new Error(`${routingType} - importCustomLink - "hrefProp" is required`);
  }
  if (componentNamedImport && componentDefaultImport) {
    console.log(
      `${routingType} - importCustomLink - "componentNamedImport" and "componentDefaultImport" are supplied. "componentDefaultImport" will be used`
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
