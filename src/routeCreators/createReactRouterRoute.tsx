import React from 'react';
import { useRouteMatch, generatePath } from 'react-router';
import { Link as DefaultLink, LinkProps as DefaultLinkProps } from 'react-router-dom';

interface RouteLinkProps<P> extends Omit<DefaultLinkProps, 'to'> {
  params: P;
}

interface Route<P> {
  pattern: string;
  generate: (inputParams: P) => string;
  useParams: () => P;
  Link: (props: RouteLinkProps<P>) => any; // current type provided by react-router-dom does not allow us to use ReactNode
}

function createReactRouterRoute<P = {}>(pattern: string): Route<P> {
  function RouteLink({ params, ...props }: RouteLinkProps<P>): any {
    const to = generatePath(pattern, params as any);
    return <DefaultLink {...props} to={to} />;
  }

  return {
    pattern,
    generate: inputParams => generatePath(pattern, inputParams as any),
    useParams: () => {
      const { path, params } = useRouteMatch<P>();

      if (path !== pattern) {
        const error = `You are trying to use useParams for "${pattern}" in "${path}". Make sure you are using the right route link object!`;
        throw new Error(error);
      }

      return params;
    },
    Link: RouteLink,
  };
}

export default createReactRouterRoute;
