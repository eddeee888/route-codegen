import { Key } from 'path-to-regexp';
import isNormalPattern from './../utils/isNormalPattern';
import {
  RoutingType,
  RouteLinkOptions,
  RouteLinkOptionsNoGenerateDefault,
  RouteLinkOptionsGenerateDefault,
} from '../config';

interface Options {
  routePattern: string;
  displayRouteName: string;
  keys: Key[];
  routingType: RoutingType;
  routeLinkOptions: RouteLinkOptions;
  generateUrlFunctionPath: string;
  shouldGenerateLink: boolean;
  shouldGenerateReactRouterFunctions: boolean;
}

const generateRouteTemplate = ({
  routePattern,
  displayRouteName,
  keys,
  routingType,
  routeLinkOptions,
  generateUrlFunctionPath,
  shouldGenerateLink,
  shouldGenerateReactRouterFunctions,
}: Options): string => {
  //TODO: bring this out

  const urlPartsInterfaceName = 'UrlParts';
  const routeLinkPropsInterfaceName = 'RouteLinkProps';
  const routeObjectInterfaceName = `${routingType}Route`;

  const hasPathParams = keys.length > 0;
  const shouldGenerateUseParams =
    routingType === RoutingType.ReactRouter && shouldGenerateReactRouterFunctions && hasPathParams;
  const shouldGenerateUseRedirect = routingType === RoutingType.ReactRouter && shouldGenerateReactRouterFunctions;

  // LinkProps interface
  const {
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
    importLink,
    generateUrlFunctionPath,
    shouldGenerateUseRedirect,
    shouldGenerateUseParams,
  });

  // Generate route interface
  const { pathParamsInterfaceTemplate, pathParamsInterfaceName } = generatePathParamsInterface(keys, displayRouteName);

  // UrlParts interface
  const { urlPartsInterfaceTemplate, urlPartsInterfaceNameWithGeneric } = generateUrlPartsInterface(
    hasPathParams,
    urlPartsInterfaceName
  );

  // RouteLinkProps interface
  const { routeLinkPropsInterfaceTemplate, routeLinkPropsInterfaceNameWithGeneric } = generateRouteLinkProps({
    hasPathParams,
    urlPartsInterfaceName,
    omittedLinkPropsInterfaceName,
    routeLinkPropsInterfaceName,
  });

  // Route object interface
  const routeObjectInterfaceTemplate = generateRouteObjectInterface({
    routeObjectInterfaceName,
    urlPartsInterfaceNameWithGeneric,
    routeLinkPropsInterfaceNameWithGeneric,
    hasPathParams,
    shouldGenerateLink,
    shouldGenerateUseParams,
    shouldGenerateUseRedirect,
  });

  // route object
  const routeObject = generateRouteObject({
    hasPathParams,
    linkComponent,
    hrefProp,
    pathParamsInterfaceName,
    shouldGenerateLink,
    shouldGenerateUseParams,
    shouldGenerateUseRedirect,
  });

  // Final template
  return `
    /* This file was automatically generated and should not be edited. */
    ${importsTemplate}

    const pattern = '${routePattern}';

    ${pathParamsInterfaceTemplate}

    ${omittedLinkPropsTemplate}

    ${urlPartsInterfaceTemplate}

    ${routeLinkPropsInterfaceTemplate}

    ${routeObjectInterfaceTemplate}

    const ${displayRouteName}: ${routeObjectInterfaceName}${
    hasPathParams ? `<${pathParamsInterfaceName}>` : ''
  } = ${routeObject}

    export default ${displayRouteName};
  `;
};

interface GenerateImportsTemplateParams {
  importLink: string;
  generateUrlFunctionPath: string;
  shouldGenerateUseParams: boolean;
  shouldGenerateUseRedirect: boolean;
}
const generateImportsTemplate = ({
  importLink,
  generateUrlFunctionPath,
  shouldGenerateUseParams,
  shouldGenerateUseRedirect,
}: GenerateImportsTemplateParams): string => {
  const shouldImportFromReactRouter = shouldGenerateUseParams || shouldGenerateUseRedirect;

  return `import React from 'react';
    import { generateUrl } from '${generateUrlFunctionPath}';
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

const generatePathParamsInterface = (
  keys: Key[],
  displayRouteName: string
): { pathParamsInterfaceTemplate: string; pathParamsInterfaceName: string } => {
  if (keys.length > 0) {
    const pathParamsInterfaceName = `${displayRouteName}PathParams`;
    let template = `export interface ${pathParamsInterfaceName} {\n`;
    keys.forEach(key => {
      const { pattern, name, modifier } = key;

      const fieldName = `${name}${modifier === '?' ? modifier : ''}`;

      if (isNormalPattern(pattern)) {
        template += `  ${fieldName}: string;\n`;
      } else {
        // Note: We are using enum here... this may not be safe
        const enumArray = pattern.split('|');
        if (enumArray.length > 0) {
          template += `  ${fieldName}:`;
          enumArray.forEach(enumValue => (template += `'${enumValue}'|`));
          // Remove last '|'
          template = template.slice(0, -1);
          template += `;\n`;
        }
      }
    });
    template += '}\n';

    return {
      pathParamsInterfaceTemplate: template,
      pathParamsInterfaceName: pathParamsInterfaceName,
    };
  }

  return { pathParamsInterfaceName: '', pathParamsInterfaceTemplate: '' };
};

const generateUrlPartsInterface = (
  hasPathParams: boolean,
  urlPartsInterfaceName: string
): { urlPartsInterfaceTemplate: string; urlPartsInterfaceNameWithGeneric: string } => {
  const urlPartsInterfaceNameWithGeneric = `${urlPartsInterfaceName}${hasPathParams ? '<P>' : ''}`;
  const urlPartsInterfaceTemplate = `
  interface ${urlPartsInterfaceNameWithGeneric} {
    ${hasPathParams ? 'path: P;' : ''}
    urlQuery?: Partial<Record<string, string>>;
  }
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
  return `
      interface ${routeObjectInterfaceName}${hasPathParams ? '<P>' : ''} {
        pattern: string;
        generate: (urlParts: ${urlPartsInterfaceNameWithGeneric}) => string;
        ${shouldGenerateLink ? `Link: React.FunctionComponent<${routeLinkPropsInterfaceNameWithGeneric}>;` : ''}
        ${shouldGenerateUseParams ? 'useParams: () => P;' : ''}
        ${
          shouldGenerateUseRedirect ? `useRedirect: (urlParts: ${urlPartsInterfaceNameWithGeneric}) => () => void;` : ''
        }
      }
  `;
};

interface GenerateRouteLinkPropsParams {
  hasPathParams: boolean;
  urlPartsInterfaceName: string;
  routeLinkPropsInterfaceName: string;
  omittedLinkPropsInterfaceName: string;
}
const generateRouteLinkProps = ({
  hasPathParams,
  urlPartsInterfaceName,
  omittedLinkPropsInterfaceName,
  routeLinkPropsInterfaceName,
}: GenerateRouteLinkPropsParams): {
  routeLinkPropsInterfaceTemplate: string;
  routeLinkPropsInterfaceNameWithGeneric: string;
} => {
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
  if (!shouldGenerateLink) {
    return {
      importReact: '',
      importLink: '',
      omittedLinkPropsTemplate: '',
      omittedLinkPropsInterfaceName: '',
      linkComponent: '',
      hrefProp: '',
    };
  }

  const option = routeLinkOptions[routingType];
  const omittedLinkPropsInterfaceName = 'OmittedLinkProps';
  const originalLinkPropsAlias = 'OriginalLinkProps';
  const importReact = `import React from 'react'`;

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
};

export default generateRouteTemplate;
