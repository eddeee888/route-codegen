/* This file was automatically generated and should not be edited. */
import { generateUrl } from 'route-codegen';
import React from 'react';
import Link, { LinkProps as OriginalLinkProps } from 'common/components/Link';

import { patternLogin as pattern } from './patternLogin';

type OmittedLinkProps = Omit<OriginalLinkProps, 'to'>;

interface UrlParts {
  urlQuery?: Partial<Record<string, string>>;
}

type RouteLinkProps = OmittedLinkProps & UrlParts;

interface ReactRouterRoute {
  pattern: string;
  generate: (urlParts: UrlParts) => string;
  Link: React.FunctionComponent<RouteLinkProps>;
}

const RouteToLogin: ReactRouterRoute = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
  Link: function RouteLink({ urlQuery, ...props }) {
    const to = generateUrl(pattern, {}, urlQuery);
    return <Link to={to} {...props} />;
  },
};

export default RouteToLogin;
