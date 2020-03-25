/* This file was automatically generated and should not be edited. */
import React from 'react';

import { generateUrl } from 'route-codegen';
import { patternAccount as pattern, UrlPartsAccount } from './patternAccount';

type OmittedLinkProps = Omit<
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  'href'
>;

type RouteLinkProps = OmittedLinkProps & UrlPartsAccount;

interface DefaultRoute {
  pattern: string;
  generate: (urlParts: UrlPartsAccount) => string;
  Link: React.FunctionComponent<RouteLinkProps>;
}

const RouteToAccount: DefaultRoute = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
  Link: function RouteLink({ urlQuery, ...props }) {
    const to = generateUrl(pattern, {}, urlQuery);
    return <a href={to} {...props} />;
  },
};

export default RouteToAccount;
