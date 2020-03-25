/* This file was automatically generated and should not be edited. */
import React from 'react';
import Link, { AnchorProps as OriginalLinkProps } from 'common/ui/Anchor';
import { generateUrl } from 'route-codegen';
import { patternLegacy as pattern, UrlPartsLegacy } from './patternLegacy';

type OmittedLinkProps = Omit<OriginalLinkProps, 'href'>;

type RouteLinkProps = OmittedLinkProps & UrlPartsLegacy;

interface DefaultRoute {
  pattern: string;
  generate: (urlParts: UrlPartsLegacy) => string;
  Link: React.FunctionComponent<RouteLinkProps>;
}

const RouteToLegacy: DefaultRoute = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
  Link: function RouteLink({ urlQuery, ...props }) {
    const to = generateUrl(pattern, {}, urlQuery);
    return <Link href={to} {...props} />;
  },
};

export default RouteToLegacy;
