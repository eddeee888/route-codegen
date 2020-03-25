/* This file was automatically generated and should not be edited. */
import React from 'react';
import Link, { LinkProps as OriginalLinkProps } from 'common/components/Link';
import { generateUrl } from 'route-codegen';
import { patternSignup as pattern, UrlPartsSignup } from './patternSignup';

type OmittedLinkProps = Omit<OriginalLinkProps, 'to'>;

type RouteLinkProps = OmittedLinkProps & UrlPartsSignup;

interface ReactRouterV5Route {
  pattern: string;
  generate: (urlParts: UrlPartsSignup) => string;
  Link: React.FunctionComponent<RouteLinkProps>;
}

const RouteToSignup: ReactRouterV5Route = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
  Link: function RouteLink({ urlQuery, ...props }) {
    const to = generateUrl(pattern, {}, urlQuery);
    return <Link to={to} {...props} />;
  },
};

export default RouteToSignup;
