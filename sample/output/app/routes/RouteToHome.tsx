/* This file was automatically generated and should not be edited. */
import React from 'react';

import { generateUrl } from 'route-codegen';
import { patternHome as pattern, UrlPartsHome } from './patternHome';

type OmittedLinkProps = Omit<
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  'href'
>;

type RouteLinkProps = OmittedLinkProps & UrlPartsHome;

interface DefaultRoute {
  pattern: string;
  generate: (urlParts: UrlPartsHome) => string;
  Link: React.FunctionComponent<RouteLinkProps>;
}

const RouteToHome: DefaultRoute = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
  Link: function RouteLink({ urlQuery, ...props }) {
    const to = generateUrl(pattern, {}, urlQuery);
    return <a href={to} {...props} />;
  },
};

export default RouteToHome;
