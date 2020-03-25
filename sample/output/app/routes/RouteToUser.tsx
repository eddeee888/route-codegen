/* This file was automatically generated and should not be edited. */
import React from 'react';
import Link, { LinkProps as OriginalLinkProps } from 'react-router-dom';
import { generateUrl } from 'route-codegen';
import { patternUser as pattern, UrlPartsUser, PathParamsUser } from './patternUser';

type OmittedLinkProps = Omit<OriginalLinkProps, 'to'>;

type RouteLinkProps = OmittedLinkProps & UrlPartsUser;

interface ReactRouterV5Route<P> {
  pattern: string;
  generate: (urlParts: UrlPartsUser) => string;
  Link: React.FunctionComponent<RouteLinkProps<P>>;
}

const RouteToUser: ReactRouterV5Route<PathParamsUser> = {
  pattern,
  generate: ({ path, urlQuery }) => generateUrl(pattern, path, urlQuery),
  Link: function RouteLink({ path, urlQuery, ...props }) {
    const to = generateUrl(pattern, path, urlQuery);
    return <Link {...props} to={to} />;
  },
};

export default RouteToUser;
