/* This file was automatically generated and should not be edited. */
import { generateUrl } from 'route-codegen';
import React from 'react';

import { patternLegacy as pattern } from './patternLegacy';

type OmittedLinkProps = Omit<
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  'href'
>;

interface UrlParts {
  urlQuery?: Partial<Record<string, string>>;
}

type RouteLinkProps = OmittedLinkProps & UrlParts;

interface DefaultRoute {
  pattern: string;
  generate: (urlParts: UrlParts) => string;
  Link: React.FunctionComponent<RouteLinkProps>;
}

const RouteToLegacy: DefaultRoute = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
  Link: function RouteLink({ urlQuery, ...props }) {
    const to = generateUrl(pattern, {}, urlQuery);
    return <a href={to} {...props} />;
  },
};

export default RouteToLegacy;
