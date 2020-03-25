/* This file was automatically generated and should not be edited. */
import React from 'react';
import Link, { LinkProps as OriginalLinkProps } from 'react-router-dom';
import { generateUrl } from 'route-codegen';
import { patternAccount as pattern, UrlPartsAccount } from './patternAccount';

type OmittedLinkProps = Omit<OriginalLinkProps, 'to'>;

type RouteLinkProps = OmittedLinkProps & UrlPartsAccount;

interface ReactRouterV5Route {
  pattern: string;
  generate: (urlParts: UrlPartsAccount) => string;
  Link: React.FunctionComponent<RouteLinkProps>;
}

const RouteToAccount: ReactRouterV5Route = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
  Link: function RouteLink({ urlQuery, ...props }) {
    const to = generateUrl(pattern, {}, urlQuery);
    return <Link to={to} {...props} />;
  },
};

export default RouteToAccount;
