import React from 'react';
import { useRouteMatch } from 'react-router';
import createLink, { LinkProps } from './createReactRouterLink';
import generateUrl from './generateUrl';

interface ReactRouterRoute<P> {
  pattern: string;
  generate: (inputParams: P, urlQuery?: Partial<Record<string, string>>) => string;
  Link: React.FunctionComponent<LinkProps<P>>;
  useParams: () => P;
}

function createReactRouterRoute<P = {}>(pattern: string): ReactRouterRoute<P> {
  return {
    pattern,
    generate: (inputParams, urlQuery) => generateUrl(pattern, inputParams as any, urlQuery),
    useParams: () => {
      const { path, params } = useRouteMatch<P>();

      if (path !== pattern) {
        const error = `You are trying to use useParams for "${pattern}" in "${path}". Make sure you are using the right route link object!`;
        throw new Error(error);
      }

      return params;
    },
    Link: createLink(pattern),
  };
}

export default createReactRouterRoute;
