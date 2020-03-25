import {
  RoutingType,
  RouteLinkOptions,
  RouteLinkOptionsNoGenerateDefault,
  RouteLinkOptionsGenerateDefault,
  ParsedReactRouterV5LinkOptions,
} from '../config';
import { RoutePatternNamedExports } from './generateRoutePatternFile';
import printImport from '../utils/printImport';
import { NamedImport, Import } from '../types';

export interface GenerateRouteTemplateOptions {
  displayRouteName: string;
  routePatternNamedExports: RoutePatternNamedExports;
  routingType: RoutingType;
  routeLinkOptions: RouteLinkOptions;
  importGenerateUrl: Import;
  shouldGenerateLink: boolean;
}

const generateRouteTemplate = ({
  displayRouteName,
  routePatternNamedExports,
  routingType,
  routeLinkOptions,
  importGenerateUrl,
  shouldGenerateLink,
}: GenerateRouteTemplateOptions): string => {
  //TODO: bring this out

  const routeLinkPropsInterfaceName = 'RouteLinkProps';
  const routeObjectInterfaceName = `${routingType}Route`;

  const pathParamsDetails = getPathParamsDetails(routePatternNamedExports.pathParamsInterfaceName);

  // LinkProps interface
  const {
    importReact,
    importLink,
    omittedLinkPropsTemplate,
    omittedLinkPropsInterfaceName,
    linkComponent,
    hrefProp,
  } = generateLinkInterface({
    shouldGenerateLink,
    routingType,
    routeLinkOptions,
  });

  // RouteLinkProps interface
  const { routeLinkPropsInterfaceTemplate, routeLinkPropsInterfaceNameWithGeneric } = generateRouteLinkProps({
    shouldGenerateLink,
    hasPathParams: pathParamsDetails.hasPathParams,
    urlPartsInterfaceName: routePatternNamedExports.urlPartsInterfaceName,
    omittedLinkPropsInterfaceName,
    routeLinkPropsInterfaceName,
  });

  // Route object interface
  const routeObjectInterfaceTemplate = generateRouteObjectInterface({
    routeObjectInterfaceName,
    urlPartsInterfaceName: routePatternNamedExports.urlPartsInterfaceName,
    routeLinkPropsInterfaceNameWithGeneric,
    hasPathParams: pathParamsDetails.hasPathParams,
    shouldGenerateLink,
  });

  // route object
  const routeObject = generateRouteObject({
    hasPathParams: pathParamsDetails.hasPathParams,
    linkComponent,
    hrefProp,
    shouldGenerateLink,
  });

  // Final template
  return `
    /* This file was automatically generated and should not be edited. */
    ${importReact}
    ${importLink}
    ${printImport(importGenerateUrl)}
    ${printImport(getPathPatternImport(routePatternNamedExports))}

    ${omittedLinkPropsTemplate}

    ${routeLinkPropsInterfaceTemplate}

    ${routeObjectInterfaceTemplate}

    const ${displayRouteName}: ${routeObjectInterfaceName}${
    pathParamsDetails.hasPathParams ? `<${pathParamsDetails.pathParamsInterfaceName}>` : ''
  } = ${routeObject}

    export default ${displayRouteName};
  `;
};

const getPathParamsDetails = (
  pathParamsInterfaceName: string | undefined
): { hasPathParams: false } | { hasPathParams: true; pathParamsInterfaceName: string } => {
  if (!!pathParamsInterfaceName) {
    return { hasPathParams: true, pathParamsInterfaceName };
  }

  return { hasPathParams: false };
};

const getPathPatternImport = ({
  filename,
  pathPatternName,
  pathParamsInterfaceName,
  urlPartsInterfaceName,
}: RoutePatternNamedExports): Import => {
  const namedImports: NamedImport[] = [{ name: pathPatternName, importAs: 'pattern' }, { name: urlPartsInterfaceName }];
  if (!!pathParamsInterfaceName) {
    namedImports.push({ name: pathParamsInterfaceName });
  }

  return {
    namedImports,
    from: `./${filename}`,
  };
};

interface GenerateRouteObjectInterfaceParams {
  routeObjectInterfaceName: string;
  urlPartsInterfaceName: string;
  routeLinkPropsInterfaceNameWithGeneric: string;
  hasPathParams: boolean;
  shouldGenerateLink: boolean;
}
const generateRouteObjectInterface = ({
  routeObjectInterfaceName,
  urlPartsInterfaceName,
  routeLinkPropsInterfaceNameWithGeneric,
  hasPathParams,
  shouldGenerateLink,
}: GenerateRouteObjectInterfaceParams): string => {
  return `interface ${routeObjectInterfaceName}${
    hasPathParams ? '<P>' : ''
  } { pattern: string; generate: (urlParts: ${urlPartsInterfaceName}) => string; ${
    shouldGenerateLink ? `Link: React.FunctionComponent<${routeLinkPropsInterfaceNameWithGeneric}>;` : ''
  } }`;
};

interface GenerateRouteLinkPropsParams {
  shouldGenerateLink: boolean;
  hasPathParams: boolean;
  urlPartsInterfaceName: string;
  routeLinkPropsInterfaceName: string;
  omittedLinkPropsInterfaceName: string;
}
const generateRouteLinkProps = ({
  shouldGenerateLink,
  hasPathParams,
  urlPartsInterfaceName,
  omittedLinkPropsInterfaceName,
  routeLinkPropsInterfaceName,
}: GenerateRouteLinkPropsParams): {
  routeLinkPropsInterfaceTemplate: string;
  routeLinkPropsInterfaceNameWithGeneric: string;
} => {
  if (!shouldGenerateLink) {
    return {
      routeLinkPropsInterfaceNameWithGeneric: '',
      routeLinkPropsInterfaceTemplate: '',
    };
  }

  const routeLinkPropsInterfaceTemplate = `type ${routeLinkPropsInterfaceName} = ${omittedLinkPropsInterfaceName} & ${urlPartsInterfaceName};`;

  const routeLinkPropsInterfaceNameWithGeneric = `${routeLinkPropsInterfaceName}${hasPathParams ? '<P>' : ''}`;

  return { routeLinkPropsInterfaceTemplate, routeLinkPropsInterfaceNameWithGeneric };
};

interface GenerateRouteObjectParams {
  hasPathParams: boolean;
  linkComponent: string;
  hrefProp: string;
  shouldGenerateLink: boolean;
}
const generateRouteObject = ({
  hasPathParams,
  linkComponent,
  hrefProp,
  shouldGenerateLink,
}: GenerateRouteObjectParams): string => {
  const generateFunction = hasPathParams
    ? '({ path, urlQuery }) => generateUrl(pattern, path, urlQuery)'
    : '({ urlQuery }) => generateUrl(pattern, {}, urlQuery)';

  const LinkFunction = hasPathParams
    ? `function RouteLink({ path, urlQuery, ...props }) {
      const to = generateUrl(pattern, path, urlQuery);
      return <${linkComponent} {...props} ${hrefProp}={to} />;
    }`
    : `function RouteLink({ urlQuery, ...props }) {
      const to = generateUrl(pattern, {}, urlQuery);
      return <${linkComponent} ${hrefProp}={to} {...props} />;
    }`;

  return `{
    pattern,
    generate: ${generateFunction},
    ${shouldGenerateLink ? `Link: ${LinkFunction},` : ''}
  };`;
};

interface GenerateLinkInterfaceParams {
  routingType: RoutingType;
  routeLinkOptions: RouteLinkOptions;
  shouldGenerateLink: boolean;
}
const generateLinkInterface = ({
  shouldGenerateLink,
  routingType,
  routeLinkOptions,
}: GenerateLinkInterfaceParams): {
  importReact: string;
  importLink: string;
  omittedLinkPropsTemplate: string;
  omittedLinkPropsInterfaceName: string;
  linkComponent: string;
  hrefProp: string;
} => {
  if (shouldGenerateLink) {
    const option = routeLinkOptions[routingType];
    const omittedLinkPropsInterfaceName = 'OmittedLinkProps';
    const originalLinkPropsAlias = 'OriginalLinkProps';
    const importReact = printImport({ defaultImport: 'React', from: 'react' });

    function shouldGenerateDefault(
      option: RouteLinkOptionsNoGenerateDefault | RouteLinkOptionsGenerateDefault | ParsedReactRouterV5LinkOptions
    ): option is RouteLinkOptionsGenerateDefault {
      if ('shouldGenerateDefault' in option) {
        return option.shouldGenerateDefault;
      }
      return false;
    }

    if (shouldGenerateDefault(option)) {
      if (routingType === RoutingType.Default) {
        const hrefProp = 'href';
        return {
          importReact,
          importLink: '',
          omittedLinkPropsTemplate: `type ${omittedLinkPropsInterfaceName} = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, '${hrefProp}'>;`,
          omittedLinkPropsInterfaceName,
          linkComponent: 'a',
          hrefProp,
        };
      } else if (routingType === RoutingType.NextJS) {
        const hrefProp = 'href';
        const importLink = printImport({
          defaultImport: 'Link',
          namedImports: [{ name: 'LinkProps', importAs: originalLinkPropsAlias }],
          from: 'next/link',
        });
        return {
          importReact,
          importLink,
          omittedLinkPropsTemplate: `type ${omittedLinkPropsInterfaceName} = Omit<${originalLinkPropsAlias}, '${hrefProp}'>;`,
          omittedLinkPropsInterfaceName,
          linkComponent: 'Link',
          hrefProp,
        };
      }
    } else {
      const hrefProp = option.hrefProp;
      const importLink = printImport({
        defaultImport: 'Link',
        namedImports: [{ name: option.propsInterfaceName, importAs: originalLinkPropsAlias }],
        from: option.path,
      });
      return {
        importReact,
        importLink: importLink,
        omittedLinkPropsTemplate: `type ${omittedLinkPropsInterfaceName} = Omit<${originalLinkPropsAlias}, '${hrefProp}'>;`,
        omittedLinkPropsInterfaceName,
        linkComponent: 'Link',
        hrefProp,
      };
    }
  }
  return {
    importReact: '',
    importLink: '',
    omittedLinkPropsTemplate: '',
    omittedLinkPropsInterfaceName: '',
    linkComponent: '',
    hrefProp: '',
  };
};

export default generateRouteTemplate;
