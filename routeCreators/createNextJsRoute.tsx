import React from 'react';
import { generatePath } from 'react-router';
import LinkNext, { LinkProps } from 'next/link';

interface RouteLinkProps<P> extends Omit<LinkProps, 'href'> {
  params: P;
  children: React.ReactNode;
}

interface NextJsRoute<P> {
  pattern: string;
  generate: (inputParams: P) => string;
  Link: (props: RouteLinkProps<P>) => any;
}

function createNextJsRoute<P = {}>(pattern: string): NextJsRoute<P> {
  function NextJsLink({ params, children, ...props }: RouteLinkProps<P>): any {
    const to = generatePath(pattern, params as any);
    return (
      <LinkNext href={to} {...props}>
        <a>{children}</a>
      </LinkNext>
    );
  }

  return {
    pattern,
    generate: params => generatePath(pattern, params as any),
    Link: NextJsLink,
  };
}

export default createNextJsRoute;
