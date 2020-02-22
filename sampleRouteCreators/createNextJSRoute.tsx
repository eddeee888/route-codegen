import React from 'react';
import createLink, { LinkProps } from './createNextJSLink';
import generateUrl from './generateUrl';

interface NextJSRoute<P> {
  pattern: string;
  generate: (inputParams: P, urlQuery?: Record<string, string>) => string;
  Link: React.FunctionComponent<LinkProps<P>>;
}

function createNextJSRoute<P = {}>(pattern: string): NextJSRoute<P> {
  return {
    pattern,
    generate: (params, urlQuery) => generateUrl(pattern, params as any, urlQuery),
    Link: createLink(pattern),
  };
}

export default createNextJSRoute;
