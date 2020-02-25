import { RoutingType, RouteLinkCreators } from '../config';
import { writeFileSync } from 'fs';

const generateDefaultLinkFile = (utilsDir: string, functionName: string, generateUrlFunctionPath: string): void => {
  let template = `/* This file was automatically generated and should not be edited. */\n`;
  template += `
    import React from 'react';
    import { generateUrl } from '${generateUrlFunctionPath}';
    
    type AnchorProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
    
    export interface LinkProps<P> extends Omit<AnchorProps, 'href'> {
      params: P;
      urlQuery?: Partial<Record<string, string>>;
    }
    
    function ${functionName}<P = {}>(pattern: string) {
      return function RouteLink({ params, urlQuery, ...props }: LinkProps<P>) {
        const to = generateUrl(pattern, params as any, urlQuery);
        return <a href={to} {...props} />;
      };
    }
    
    export default ${functionName};
  `;
  writeFileSync(utilsDir.concat('/', `${functionName}.tsx`), template);
};

const generateNextJSLinkFile = (utilsDir: string, functionName: string, generateUrlFunctionPath: string): void => {
  let template = `/* This file was automatically generated and should not be edited. */\n`;
  template += `
    import React from 'react';
    import { generateUrl } from '${generateUrlFunctionPath}';
    import LinkNext, { LinkProps as NextJSLinkProps } from 'next/link';
    
    export interface LinkProps<P> extends Omit<NextJSLinkProps, 'href'> {
      params: P;
      children: React.ReactNode;
      urlQuery?: Partial<Record<string, string>>;
    }
    
    function ${functionName}<P = {}>(pattern: string) {
      return function NextJSLink({ params, children, urlQuery, ...props }: LinkProps<P>) {
        const to = generateUrl(pattern, params as any, urlQuery);
        return (
          <LinkNext href={to} {...props}>
            <a>{children}</a>
          </LinkNext>
        );
      };
    }
    
    export default ${functionName};
  `;
  writeFileSync(utilsDir.concat('/', `${functionName}.tsx`), template);
};

const generateReactRouterLinkFile = (utilsDir: string, functionName: string, generateUrlFunctionPath: string): void => {
  let template = `/* This file was automatically generated and should not be edited. */\n`;
  template += `
    import React from 'react';
    import { generateUrl } from '${generateUrlFunctionPath}';
    import { Link, LinkProps as ReactRouterLinkProps } from 'react-router-dom';

    export interface LinkProps<P> extends Omit<ReactRouterLinkProps, 'to'> {
      params: P;
      urlQuery?: Partial<Record<string, string>>;
    }
    
    function ${functionName}<P = {}>(pattern: string) {
      return function ReactRouterLink({ params, urlQuery, ...props }: LinkProps<P>): any {
        const to = generateUrl(pattern, params as any, urlQuery);
        return <Link {...props} to={to} />;
      };
    }
    
    export default ${functionName};
  `;

  writeFileSync(utilsDir.concat('/', `${functionName}.tsx`), template);
};

type GenerateRouteCreatorFile = (params: {
  routingType: RoutingType;
  utilsFolder: string;
  generateUrlFunctionPath: string;
  routeLinkCreators: RouteLinkCreators;
  shouldGenerateLink: boolean;
  shouldGenerateReactRouterFunctions: boolean;
}) => void;

const generateRouteCreatorFile: GenerateRouteCreatorFile = ({
  routingType,
  utilsFolder,
  routeLinkCreators,
  generateUrlFunctionPath,
  shouldGenerateLink,
  shouldGenerateReactRouterFunctions,
}): void => {
  const functionName = `create${routingType}Route`;
  const resultInterfaceName = `${routingType}Route`;
  const createLinkFunctionName = `create${routingType}Link`;

  let importLinkRow = '';
  let interfaceLinkRow = '';
  let routeLinkRow = '';
  if (shouldGenerateLink) {
    let createLinkFunctionPath = '';
    switch (routingType) {
      case RoutingType.ReactRouter:
        createLinkFunctionPath = routeLinkCreators.ReactRouter.path;
        if (routeLinkCreators.ReactRouter.shouldGenerateDefault) {
          generateReactRouterLinkFile(utilsFolder, createLinkFunctionName, generateUrlFunctionPath);
        }
        break;
      case RoutingType.NextJS:
        createLinkFunctionPath = routeLinkCreators.NextJS.path;
        if (routeLinkCreators.NextJS.shouldGenerateDefault) {
          generateNextJSLinkFile(utilsFolder, createLinkFunctionName, generateUrlFunctionPath);
        }
        break;
      default:
        createLinkFunctionPath = routeLinkCreators.Default.path;
        if (routeLinkCreators.Default.shouldGenerateDefault) {
          generateDefaultLinkFile(utilsFolder, createLinkFunctionName, generateUrlFunctionPath);
        }
        break;
    }
    importLinkRow = `import createLink, { LinkProps } from '${createLinkFunctionPath}'\n`;
    interfaceLinkRow = 'Link: React.FunctionComponent<LinkProps<P>>;';
    routeLinkRow = 'Link: createLink(pattern),';
  }

  const shouldGenerateReactRouterRows = routingType === RoutingType.ReactRouter && shouldGenerateReactRouterFunctions;
  let importReactRouterRows = '';
  let interfaceReactRouterRows = '';
  let routeReactRouterRows = '';
  if (shouldGenerateReactRouterRows) {
    importReactRouterRows = `import { useRouteMatch } from 'react-router';\nimport { useHistory } from 'react-router';\n`;
    interfaceReactRouterRows = `useParams: () => P;\nuseRedirect: (inputParams: P, urlQuery?: Partial<Record<string, string>>) => () => void;\n`;
    routeReactRouterRows = `useParams: () => {
      const { path, params } = useRouteMatch<P>();

      if (path !== pattern) {
        const error = \`You are trying to use useParams for "${'${pattern}'}" in "${'${path}'}". Make sure you are using the right route link object!\`;
        throw new Error(error);
      }

      return params;
    },
    useRedirect: (inputParams, urlQuery) => {
      const history = useHistory();
      const to = generateUrl(pattern, inputParams as any, urlQuery);
      return () => history.push(to);
    },`;
  }

  let template = `/* This file was automatically generated and should not be edited. */\n`;

  // imports
  template += `${importLinkRow}
    ${importReactRouterRows}
    import { generateUrl } from '${generateUrlFunctionPath}';
  `;

  // main function + type
  template += `
    interface ${resultInterfaceName}<P> {
      pattern: string;
      generate: (inputParams: P, urlQuery?: Partial<Record<string, string>>) => string;
      ${interfaceLinkRow}
      ${interfaceReactRouterRows}
    }
    
    function ${functionName}<P = {}>(pattern: string): ${resultInterfaceName}<P> {
      return {
        pattern,
        generate: (inputParams, urlQuery) => generateUrl(pattern, inputParams as any, urlQuery),
        ${routeLinkRow}
        ${routeReactRouterRows}
      };
    }
    
    export default ${functionName};
  `;

  writeFileSync(utilsFolder.concat('/', `${functionName}.ts`), template);
};

export default generateRouteCreatorFile;
