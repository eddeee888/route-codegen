import React from 'react';
import { generatePath } from 'react-router';
import createLink, { LinkProps } from './createNextJSLink';

interface NextJSRoute<P> {
  pattern: string;
  generate: (inputParams: P) => string;
  Link: React.FunctionComponent<LinkProps<P>>;
}

function createNextJSRoute<P = {}>(pattern: string): NextJSRoute<P> {
  return {
    pattern,
    generate: params => generatePath(pattern, params as any),
    Link: createLink(pattern),
  };
}

export default createNextJSRoute;
