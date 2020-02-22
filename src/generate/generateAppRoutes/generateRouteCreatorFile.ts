import { RoutingType } from '../config';
import { mkdirSync, writeFileSync } from 'fs';

const generateDefaultLinkFile = (utilsDir: string, functionName: string, generateUrlFunctionPath: string): void => {
  let template = `/* This file was automatically generated and should not be edited. */\n`;
  template += `
    import React from 'react';
    import generateUrl from '${generateUrlFunctionPath}';
    
    type AnchorProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
    
    export interface LinkProps<P> extends Omit<AnchorProps, 'href'> {
      params: P;
      urlQuery?: Record<string, string>;
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
    import generateUrl from '${generateUrlFunctionPath}';
    import LinkNext, { LinkProps as NextJSLinkProps } from 'next/link';
    
    export interface LinkProps<P> extends Omit<NextJSLinkProps, 'href'> {
      params: P;
      children: React.ReactNode;
      urlQuery?: Record<string, string>;
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
    import generateUrl from '${generateUrlFunctionPath}';
    import { Link, LinkProps as ReactRouterLinkProps } from 'react-router-dom';

    export interface LinkProps<P> extends Omit<ReactRouterLinkProps, 'to'> {
      params: P;
      urlQuery?: Record<string, string>;
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
  reactRouterLinkCreatorPath: string;
  nextJSLinkCreatorPath: string;
  defaultLinkCreatorPath: string;
  generateUrlFunctionPath: string;
}) => void;

const generateRouteCreatorFile: GenerateRouteCreatorFile = ({
  routingType,
  utilsFolder,
  reactRouterLinkCreatorPath,
  nextJSLinkCreatorPath,
  defaultLinkCreatorPath,
  generateUrlFunctionPath,
}): void => {
  const functionName = `create${routingType}Route`;
  const resultInterfaceName = `${routingType}Route`;
  const createLinkFunctionName = `create${routingType}Link`;

  let createLinkFunctionPath = '';
  switch (routingType) {
    case RoutingType.ReactRouter:
      createLinkFunctionPath = reactRouterLinkCreatorPath;
      generateReactRouterLinkFile(utilsFolder, createLinkFunctionName, generateUrlFunctionPath);
      break;
    case RoutingType.NextJS:
      createLinkFunctionPath = nextJSLinkCreatorPath;
      generateNextJSLinkFile(utilsFolder, createLinkFunctionName, generateUrlFunctionPath);
      break;
    default:
      createLinkFunctionPath = defaultLinkCreatorPath;
      generateDefaultLinkFile(utilsFolder, createLinkFunctionName, generateUrlFunctionPath);
      break;
  }

  let template = `/* This file was automatically generated and should not be edited. */\n`;

  // imports
  template += `
    import createLink, { LinkProps } from '${createLinkFunctionPath}';
    import generateUrl from '${generateUrlFunctionPath}';
    ${routingType === RoutingType.ReactRouter ? `import { useRouteMatch } from 'react-router';` : ''}
  `;

  // main function + type
  template += `
    interface ${resultInterfaceName}<P> {
      pattern: string;
      generate: (inputParams: P, urlQuery?: Record<string,string>) => string;
      Link: React.FunctionComponent<LinkProps<P>>;
      ${routingType === RoutingType.ReactRouter ? 'useParams: () => P;' : ''}
    }
    
    function ${functionName}<P = {}>(pattern: string): ${resultInterfaceName}<P> {
      return {
        pattern,
        generate: (inputParams, urlQuery) => generateUrl(pattern, inputParams as any, urlQuery),
        Link: createLink(pattern),
        ${
          routingType === RoutingType.ReactRouter
            ? `
        useParams: () => {
          const { path, params } = useRouteMatch<P>();
    
          if (path !== pattern) {
            const error = \`You are trying to use useParams for "${'${pattern}'}" in "${'${path}'}". Make sure you are using the right route link object!\`;
            throw new Error(error);
          }
    
          return params;
        },
        `
            : ''
        }
      };
    }
    
    export default ${functionName};
  `;

  writeFileSync(utilsFolder.concat('/', `${functionName}.ts`), template);
};

export default generateRouteCreatorFile;
