import {
  RoutingType,
  RouteLinkOptions,
  RouteLinkOptionsNoGenerateDefault,
  RouteLinkOptionsGenerateDefault,
} from '../config';
import { RoutePatternNamedExports } from './generateRoutePatternFile';
import printImport from '../utils/printImport';
import { NamedImport, Import } from '../types';

export interface GenerateRouteTemplateOptions {
  displayRouteName: string;
  routePatternNamedExports: RoutePatternNamedExports;
  routingType: RoutingType;
  routeLinkOptions: RouteLinkOptions;
  generateUrlFunctionPath: string;
  shouldGenerateLink: boolean;
  shouldGenerateReactRouterFunctions: boolean;
}

const generateRouteTemplate = ({
  displayRouteName,
  routePatternNamedExports,
  routingType,
  routeLinkOptions,
  generateUrlFunctionPath,
  shouldGenerateLink,
  shouldGenerateReactRouterFunctions,
}: GenerateRouteTemplateOptions): string => {
  //TODO: bring this out

  const urlPartsInterfaceName = 'UrlParts';
  const routeLinkPropsInterfaceName = 'RouteLinkProps';
  const routeObjectInterfaceName = `${routingType}Route`;

  const pathParamsDetails = getPathParamsDetails(routePatternNamedExports.pathParamsInterfaceName);

  const shouldGenerateUseParams =
    routingType === RoutingType.ReactRouter && shouldGenerateReactRouterFunctions && pathParamsDetails.hasPathParams;
  const shouldGenerateUseRedirect = routingType === RoutingType.ReactRouter && shouldGenerateReactRouterFunctions;

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

  // imports
  const importsTemplate = generateImportsTemplate({
    importReact,
    importLink,
    generateUrlFunctionPath,
    shouldGenerateUseRedirect,
    shouldGenerateUseParams,
  });

  // UrlParts interface
  const { urlPartsInterfaceTemplate, urlPartsInterfaceNameWithGeneric } = generateUrlPartsInterface(
    pathParamsDetails.hasPathParams,
    urlPartsInterfaceName
  );

  // RouteLinkProps interface
  const { routeLinkPropsInterfaceTemplate, routeLinkPropsInterfaceNameWithGeneric } = generateRouteLinkProps({
    shouldGenerateLink,
    hasPathParams: pathParamsDetails.hasPathParams,
    urlPartsInterfaceName,
    omittedLinkPropsInterfaceName,
    routeLinkPropsInterfaceName,
  });

  // Route object interface
  const routeObjectInterfaceTemplate = generateRouteObjectInterface({
    routeObjectInterfaceName,
    urlPartsInterfaceNameWithGeneric,
    routeLinkPropsInterfaceNameWithGeneric,
    hasPathParams: pathParamsDetails.hasPathParams,
    shouldGenerateLink,
    shouldGenerateUseParams,
    shouldGenerateUseRedirect,
  });

  // route object
  const routeObject = generateRouteObject({
    hasPathParams: pathParamsDetails.hasPathParams,
    linkComponent,
    hrefProp,
    pathParamsInterfaceName: routePatternNamedExports.pathParamsInterfaceName
      ? routePatternNamedExports.pathParamsInterfaceName
      : '', //TODO: review this because this is already built into shouldGenerateUseParams
    shouldGenerateLink,
    shouldGenerateUseParams,
    shouldGenerateUseRedirect,
  });

  // Final template
  return `
    /* This file was automatically generated and should not be edited. */
    ${importsTemplate}
    ${printImport(getPathPatternImport(routePatternNamedExports))}

    ${omittedLinkPropsTemplate}

    ${urlPartsInterfaceTemplate}

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
}: RoutePatternNamedExports): Import => {
  const namedImports: NamedImport[] = [{ name: pathPatternName, importAs: 'pattern' }];
  if (!!pathParamsInterfaceName) {
    namedImports.push({ name: pathParamsInterfaceName });
  }

  return {
    namedImports,
    from: `./${filename}`,
  };
};

interface GenerateImportsTemplateParams {
  importReact: string;
  importLink: string;
  generateUrlFunctionPath: string;
  shouldGenerateUseParams: boolean;
  shouldGenerateUseRedirect: boolean;
}
const generateImportsTemplate = ({
  importReact,
  importLink,
  generateUrlFunctionPath,
  shouldGenerateUseParams,
  shouldGenerateUseRedirect,
}: GenerateImportsTemplateParams): string => {
  const shouldImportFromReactRouter = shouldGenerateUseParams || shouldGenerateUseRedirect;

  return `import { generateUrl } from '${generateUrlFunctionPath}';
    ${importReact}
    ${importLink}
    ${
      shouldImportFromReactRouter
        ? `import { ${shouldGenerateUseParams ? 'useRouteMatch,' : ''} ${
            shouldGenerateUseRedirect ? 'useHistory,' : ''
          } } from 'react-router';`
        : ''
    }
  `;
};

const generateUrlPartsInterface = (
  hasPathParams: boolean,
  urlPartsInterfaceName: string
): { urlPartsInterfaceTemplate: string; urlPartsInterfaceNameWithGeneric: string } => {
  const urlPartsInterfaceNameWithGeneric = `${urlPartsInterfaceName}${hasPathParams ? '<P>' : ''}`;
  const urlPartsInterfaceTemplate = `interface ${urlPartsInterfaceNameWithGeneric} { ${
    hasPathParams ? 'path: P;' : ''
  } urlQuery?: Partial<Record<string, string>>; }
`;

  return { urlPartsInterfaceTemplate, urlPartsInterfaceNameWithGeneric };
};

interface GenerateRouteObjectInterfaceParams {
  routeObjectInterfaceName: string;
  urlPartsInterfaceNameWithGeneric: string;
  routeLinkPropsInterfaceNameWithGeneric: string;
  hasPathParams: boolean;
  shouldGenerateLink: boolean;
  shouldGenerateUseParams: boolean;
  shouldGenerateUseRedirect: boolean;
}
const generateRouteObjectInterface = ({
  routeObjectInterfaceName,
  urlPartsInterfaceNameWithGeneric,
  routeLinkPropsInterfaceNameWithGeneric,
  hasPathParams,
  shouldGenerateLink,
  shouldGenerateUseParams,
  shouldGenerateUseRedirect,
}: GenerateRouteObjectInterfaceParams): string => {
  return `interface ${routeObjectInterfaceName}${
    hasPathParams ? '<P>' : ''
  } { pattern: string; generate: (urlParts: ${urlPartsInterfaceNameWithGeneric}) => string; ${
    shouldGenerateLink ? `Link: React.FunctionComponent<${routeLinkPropsInterfaceNameWithGeneric}>;` : ''
  } ${shouldGenerateUseParams ? 'useParams: () => P;' : ''} ${
    shouldGenerateUseRedirect ? `useRedirect: (urlParts: ${urlPartsInterfaceNameWithGeneric}) => () => void;` : ''
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

  const routeLinkPropsInterfaceTemplate = hasPathParams
    ? `type ${routeLinkPropsInterfaceName}<P> = ${omittedLinkPropsInterfaceName} & ${urlPartsInterfaceName}<P>;`
    : `type ${routeLinkPropsInterfaceName} = ${omittedLinkPropsInterfaceName} & ${urlPartsInterfaceName};`;

  const routeLinkPropsInterfaceNameWithGeneric = `${routeLinkPropsInterfaceName}${hasPathParams ? '<P>' : ''}`;

  return { routeLinkPropsInterfaceTemplate, routeLinkPropsInterfaceNameWithGeneric };
};

interface GenerateRouteObjectParams {
  hasPathParams: boolean;
  linkComponent: string;
  pathParamsInterfaceName: string;
  hrefProp: string;
  shouldGenerateLink: boolean;
  shouldGenerateUseParams: boolean;
  shouldGenerateUseRedirect: boolean;
}
const generateRouteObject = ({
  hasPathParams,
  linkComponent,
  pathParamsInterfaceName,
  hrefProp,
  shouldGenerateLink,
  shouldGenerateUseParams,
  shouldGenerateUseRedirect,
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

  const useParamsFunction = `() => {
      const { path, params } = useRouteMatch<${pathParamsInterfaceName}>();
  
      if (path !== pattern) {
        const error = \`You are trying to use useParams for "${'${pattern}'}" in "${'${path}'}". Make sure you are using the right route link object!\`;
        throw new Error(error);
      }
  
      return params;
    }`;

  const useRedirectFunction = hasPathParams
    ? `({ path, urlQuery }) => {
      const history = useHistory();
      const to = generateUrl(pattern, path, urlQuery);
      return () => history.push(to);
    }`
    : `({ urlQuery }) => {
    const history = useHistory();
    const to = generateUrl(pattern, {}, urlQuery);
    return () => history.push(to);
  }`;

  return `{
    pattern,
    generate: ${generateFunction},
    ${shouldGenerateLink ? `Link: ${LinkFunction},` : ''}
    ${shouldGenerateUseParams ? `useParams: ${useParamsFunction},` : ''}
    ${shouldGenerateUseRedirect ? `useRedirect: ${useRedirectFunction},` : ''}
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
      option: RouteLinkOptionsNoGenerateDefault | RouteLinkOptionsGenerateDefault
    ): option is RouteLinkOptionsGenerateDefault {
      return option.shouldGenerateDefault;
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
        return {
          importReact,
          importLink: `import Link, { LinkProps as ${originalLinkPropsAlias} } from 'next/link';`,
          omittedLinkPropsTemplate: `type ${omittedLinkPropsInterfaceName} = Omit<${originalLinkPropsAlias}, '${hrefProp}'>;`,
          omittedLinkPropsInterfaceName,
          linkComponent: 'Link',
          hrefProp,
        };
      } else if (routingType === RoutingType.ReactRouter) {
        const hrefProp = 'to';
        return {
          importReact,
          importLink: `import { Link, LinkProps as ${originalLinkPropsAlias} } from 'react-router-dom';`,
          omittedLinkPropsTemplate: `type ${omittedLinkPropsInterfaceName} = Omit<${originalLinkPropsAlias}, '${hrefProp}'>;`,
          omittedLinkPropsInterfaceName,
          linkComponent: 'Link',
          hrefProp,
        };
      }
    } else {
      const hrefProp = option.hrefProp;
      return {
        importReact,
        importLink: `import Link, { ${option.propsInterfaceName} as ${originalLinkPropsAlias} } from '${option.path}'`,
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
