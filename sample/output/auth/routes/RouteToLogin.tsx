/* This file was automatically generated and should not be edited. */
import React from 'react';
import Link, { LinkProps as OriginalLinkProps } from 'common/components/Link';
import { generateUrl } from 'route-codegen';
import { patternLogin as pattern, UrlPartsLogin } from './patternLogin';

type OmittedLinkProps = Omit<OriginalLinkProps, 'to'>;

type RouteLinkProps = OmittedLinkProps & UrlPartsLogin;

interface ReactRouterV5Route {
  pattern: string;
  generate: (urlParts: UrlPartsLogin) => string;
  Link: React.FunctionComponent<RouteLinkProps>;
}

const RouteToLogin: ReactRouterV5Route = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
  Link: function RouteLink({ urlQuery, ...props }) {
    const to = generateUrl(pattern, {}, urlQuery);
    return <Link to={to} {...props} />;
  },
};

export default RouteToLogin;
