/* This file was automatically generated and should not be edited. */
import { generateUrl } from 'route-codegen';
import React from 'react';

const pattern = '/app/users/:id/:subview(profile|pictures)?';

export interface RouteToUserPathParams {
  id: string;
  subview?: 'profile' | 'pictures';
}

type OmittedLinkProps = Omit<
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  'href'
>;

interface UrlParts<P> {
  path: P;
  urlQuery?: Partial<Record<string, string>>;
}

type RouteLinkProps<P> = OmittedLinkProps & UrlParts<P>;

interface DefaultRoute<P> {
  pattern: string;
  generate: (urlParts: UrlParts<P>) => string;
  Link: React.FunctionComponent<RouteLinkProps<P>>;
}

const RouteToUser: DefaultRoute<RouteToUserPathParams> = {
  pattern,
  generate: ({ path, urlQuery }) => generateUrl(pattern, path, urlQuery),
  Link: function RouteLink({ path, urlQuery, ...props }) {
    const to = generateUrl(pattern, path, urlQuery);
    return <a {...props} href={to} />;
  },
};

export default RouteToUser;
