import React from 'react';
import { generatePath } from 'react-router';

type AnchorProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export interface LinkProps<P> extends Omit<AnchorProps, 'href'> {
  params: P;
}

function createDefaultLink<P = {}>(pattern: string) {
  return function RouteLink({ params, ...props }: LinkProps<P>) {
    const to = generatePath(pattern, params as any);
    return <a href={to} {...props} />;
  };
}

export default createDefaultLink;
