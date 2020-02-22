import React from 'react';
import { useRouteMatch, generatePath } from 'react-router';
import createLink, { LinkProps } from './createReactRouterLink';

interface ReactRouterRoute<P> {
  pattern: string;
  generate: (inputParams: P) => string;
  Link: React.FunctionComponent<LinkProps<P>>;
  useParams: () => P;
}

function createReactRouterRoute<P = {}>(pattern: string): ReactRouterRoute<P> {
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
    Link: createLink(pattern),
  };
}

export default createReactRouterRoute;
