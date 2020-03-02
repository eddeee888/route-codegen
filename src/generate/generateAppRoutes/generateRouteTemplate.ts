import { Key } from 'path-to-regexp';
import isNormalPattern from './../utils/isNormalPattern';
import { RoutingType } from '../config';

interface Options {
  routePattern: string;
  displayRouteName: string;
  keys: Key[];
  routingType: RoutingType;
  shouldGenerateLink: boolean;
  shouldGenerateReactRouterFunctions: boolean;
}

const generateRouteTemplate = ({
  routePattern,
  displayRouteName,
  keys,
  routingType,
  shouldGenerateLink,
  shouldGenerateReactRouterFunctions,
}: Options): string => {
  //TODO: bring this out
  const linkPropsInterfaceName = 'AnchorProps';
  const linkHrefProp = 'href';
  const linkPath = 'common/ui/Anchor';

  const urlPartsInterfaceName = 'UrlParts';
  const routeLinkPropsInterfaceName = 'RouteLinkProps';

  // imports
  const importsTemplate = `import React from 'react';
  import { generateUrl } from 'route-codegen';
  import Link, { ${linkPropsInterfaceName} } from '${linkPath}';
  `;

  const hasPathParams = keys.length > 0;
  const shouldGenerateUseParams = shouldGenerateReactRouterFunctions && hasPathParams;
  const shouldGenerateUseRedirect = shouldGenerateReactRouterFunctions;

  // Generate route interface
  const { pathParamsInterfaceTemplate, pathParamsInterfaceName } = generatePathParamsInterface(keys, displayRouteName);

  const { urlPartsInterfaceTemplate, urlPartsInterfaceNameWithGeneric } = generateUrlPartsInterface(
    hasPathParams,
    urlPartsInterfaceName
  );

  const { routeLinkPropsInterfaceTemplate, routeLinkPropsInterfaceNameWithGeneric } = generateRouteLinkProps({
    hasPathParams,
    urlPartsInterfaceName,
    linkHrefProp,
    linkPropsInterfaceName,
    routeLinkPropsInterfaceName,
  });

  const { routeObjectInterfaceTemplate, routeObjectInterfaceName } = generateRouteObjectInterface({
    interfaceName: `${routingType}Route`,
    urlPartsInterfaceNameWithGeneric,
    routeLinkPropsInterfaceNameWithGeneric,
    hasPathParams,
    shouldGenerateLink,
    shouldGenerateUseParams,
    shouldGenerateUseRedirect,
  });

  const routeObject = generateRouteObject({
    hasPathParams,
    shouldGenerateLink,
    shouldGenerateUseParams,
    shouldGenerateUseRedirect,
  });

  // Generate route object
  return `
    /* This file was automatically generated and should not be edited. */
    ${importsTemplate}

    const pattern = '${routePattern}';

    ${pathParamsInterfaceTemplate}

    ${urlPartsInterfaceTemplate}

    ${routeLinkPropsInterfaceTemplate}

    ${routeObjectInterfaceTemplate}

    const ${displayRouteName}: ${routeObjectInterfaceName}${
    hasPathParams ? `<${pathParamsInterfaceName}>` : ''
  } = ${routeObject}

    export default ${displayRouteName};
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
  interfaceName: string;
  urlPartsInterfaceNameWithGeneric: string;
  routeLinkPropsInterfaceNameWithGeneric: string;
  hasPathParams: boolean;
  shouldGenerateLink: boolean;
  shouldGenerateUseParams: boolean;
  shouldGenerateUseRedirect: boolean;
}
const generateRouteObjectInterface = ({
  interfaceName,
  urlPartsInterfaceNameWithGeneric,
  routeLinkPropsInterfaceNameWithGeneric,
  hasPathParams,
  shouldGenerateLink,
  shouldGenerateUseParams,
  shouldGenerateUseRedirect,
}: GenerateRouteObjectInterfaceParams): { routeObjectInterfaceTemplate: string; routeObjectInterfaceName: string } => {
  const pathParamsGeneric = hasPathParams ? '<P>' : '';
  const routeObjectInterfaceName = `${interfaceName}${pathParamsGeneric}`;
  return {
    routeObjectInterfaceTemplate: `
      interface ${routeObjectInterfaceName} {
        pattern: string;
        generate: (urlParts: ${urlPartsInterfaceNameWithGeneric}) => string;
        ${shouldGenerateLink ? `React.FunctionComponent<${routeLinkPropsInterfaceNameWithGeneric}>;` : ''}
        ${shouldGenerateUseParams ? 'useParams: () => P;' : ''}
        ${
          shouldGenerateUseRedirect ? `useRedirect: (urlParts: ${urlPartsInterfaceNameWithGeneric}) => () => void;` : ''
        }
      }
  `,
    routeObjectInterfaceName,
  };
};

interface GenerateRouteLinkPropsParams {
  hasPathParams: boolean;
  urlPartsInterfaceName: string;
  routeLinkPropsInterfaceName: string;
  linkPropsInterfaceName: string;
  linkHrefProp: string;
}
const generateRouteLinkProps = ({
  hasPathParams,
  urlPartsInterfaceName,
  linkHrefProp,
  linkPropsInterfaceName,
  routeLinkPropsInterfaceName,
}: GenerateRouteLinkPropsParams): {
  routeLinkPropsInterfaceTemplate: string;
  routeLinkPropsInterfaceNameWithGeneric: string;
} => {
  const routeLinkPropsInterfaceTemplate = hasPathParams
    ? `type ${routeLinkPropsInterfaceName}<P> = Omit<${linkPropsInterfaceName}, '${linkHrefProp}'> & ${urlPartsInterfaceName}<P>;`
    : `type ${routeLinkPropsInterfaceName} = Omit<${linkPropsInterfaceName}, '${linkHrefProp}'> & ${urlPartsInterfaceName};`;

  const routeLinkPropsInterfaceNameWithGeneric = `${routeLinkPropsInterfaceName}${hasPathParams ? '<P>' : ''}`;

  return { routeLinkPropsInterfaceTemplate, routeLinkPropsInterfaceNameWithGeneric };
};

interface GenerateRouteObjectParams {
  hasPathParams: boolean;
  shouldGenerateLink: boolean;
  shouldGenerateUseParams: boolean;
  shouldGenerateUseRedirect: boolean;
}
const generateRouteObject = ({
  hasPathParams,
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
      return <Link {...props} to={to} />;
    }`
    : `function RouteLink({ urlQuery, ...props }) {
      const to = generateUrl(pattern, {}, urlQuery);
      return <Link href={to} {...props} />;
    }`;

  const useParamsFunction = `() => {
      const { path, params } = useRouteMatch<RouteToUserInfoParams>();
  
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

export default generateRouteTemplate;
