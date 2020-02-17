import React from 'react';
import { generatePath } from 'react-router';

type AnchorProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

interface RouteLinkProps<P> extends Omit<AnchorProps, 'href'> {
  params: P;
}

interface ExternalRoute<P> {
  pattern: string;
  generate: (inputParams: P) => string;
  Link: (props: RouteLinkProps<P>) => any;
}

function createExternalRoute<P = {}>(pattern: string): ExternalRoute<P> {
  function RouteLink({ params, ...props }: RouteLinkProps<P>): any {
    const to = generatePath(pattern, params as any);
    return <a href={to} {...props} />;
  }

  return {
    pattern,
    generate: params => generatePath(pattern, params as any),
    Link: RouteLink,
  };
}

export default createExternalRoute;
