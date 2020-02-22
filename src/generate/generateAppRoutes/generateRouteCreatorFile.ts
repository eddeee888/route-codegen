import { RoutingType } from '../config';
import { mkdirSync, writeFileSync } from 'fs';

const generateDefaultLinkFile = (utilsDir: string, functionName: string): void => {
  let template = `/* This file was automatically generated and should not be edited. */\n`;
  template += `
    import React from 'react';
    import { generatePath } from 'react-router';
    
    type AnchorProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
    
    export interface LinkProps<P> extends Omit<AnchorProps, 'href'> {
      params: P;
    }
    
    function ${functionName}<P = {}>(pattern: string) {
      return function RouteLink({ params, ...props }: LinkProps<P>) {
        const to = generatePath(pattern, params as any);
        return <a href={to} {...props} />;
      };
    }
    
    export default ${functionName};
  `;
  writeFileSync(utilsDir.concat('/', `${functionName}.tsx`), template);
};

const generateNextJSLinkFile = (utilsDir: string, functionName: string): void => {
  let template = `/* This file was automatically generated and should not be edited. */\n`;
  template += `
    import { generatePath } from 'react-router';
    import LinkNext, { LinkProps as NextJSLinkProps } from 'next/link';
    
    export interface LinkProps<P> extends Omit<NextJSLinkProps, 'href'> {
      params: P;
      children: React.ReactNode;
    }
    
    function ${functionName}<P = {}>(pattern: string) {
      return function NextJSLink({ params, children, ...props }: LinkProps<P>) {
        const to = generatePath(pattern, params as any);
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

const generateReactRouterLinkFile = (utilsDir: string, functionName: string): void => {
  let template = `/* This file was automatically generated and should not be edited. */\n`;
  template += `
    import { Link, LinkProps as ReactRouterLinkProps, generatePath } from 'react-router-dom';

    export interface LinkProps<P> extends Omit<ReactRouterLinkProps, 'to'> {
      params: P;
    }
    
    function ${functionName}<P = {}>(pattern: string) {
      return function ReactRouterLink({ params, ...props }: LinkProps<P>): any {
        const to = generatePath(pattern, params as any);
        return <Link {...props} to={to} />;
      };
    }
    
    export default ${functionName};
  `;

  writeFileSync(utilsDir.concat('/', `${functionName}.tsx`), template);
};

type GenerateRouteCreatorFile = (params: {
  routingType: RoutingType;
  destinationDir: string;
  reactRouterLinkCreator: string;
  nextJSLinkCreator: string;
  defaultLinkCreator: string;
}) => void;

const generateRouteCreatorFile: GenerateRouteCreatorFile = ({
  routingType,
  destinationDir,
  reactRouterLinkCreator,
  nextJSLinkCreator,
  defaultLinkCreator,
}): void => {
  const functionName = `create${routingType}Route`;
  const resultInterfaceName = `${routingType}Route`;
  const createLinkFunctionName = `create${routingType}Link`;

  const utilsFolder = destinationDir.concat('/', '/utils');
  mkdirSync(utilsFolder, { recursive: true });

  let createLinkFunctionPath = '';
  switch (routingType) {
    case RoutingType.ReactRouter:
      createLinkFunctionPath = reactRouterLinkCreator;
      generateReactRouterLinkFile(utilsFolder, createLinkFunctionName);
      break;
    case RoutingType.NextJS:
      createLinkFunctionPath = nextJSLinkCreator;
      generateNextJSLinkFile(utilsFolder, createLinkFunctionName);
      break;
    default:
      createLinkFunctionPath = defaultLinkCreator;
      generateDefaultLinkFile(utilsFolder, createLinkFunctionName);
      break;
  }

  let template = `/* This file was automatically generated and should not be edited. */\n`;

  // imports
  template += `
    import createLink, { LinkProps } from '${createLinkFunctionPath}';
    import { generatePath } from 'react-router';
    ${routingType === RoutingType.ReactRouter ? `import { useRouteMatch } from 'react-router';` : ''}
  `;

  // main function + type
  template += `
    interface ${resultInterfaceName}<P> {
      pattern: string;
      generate: (inputParams: P) => string;
      Link: React.FunctionComponent<LinkProps<P>>;
      ${routingType === RoutingType.ReactRouter ? 'useParams: () => P;' : ''}
    }
    
    function ${functionName}<P = {}>(pattern: string): ${resultInterfaceName}<P> {
      return {
        pattern,
        generate: params => generatePath(pattern, params as any),
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
