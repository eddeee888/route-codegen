/* This file was automatically generated and should not be edited. */
import React from 'react';
import Link, { LinkProps as OriginalLinkProps } from 'next/link';
import { generateUrl } from 'route-codegen';
import { patternAbout as pattern, UrlPartsAbout } from './patternAbout';

type OmittedLinkProps = Omit<OriginalLinkProps, 'href'>;

type RouteLinkProps = OmittedLinkProps & UrlPartsAbout;

interface NextJSRoute {
  pattern: string;
  generate: (urlParts: UrlPartsAbout) => string;
  Link: React.FunctionComponent<RouteLinkProps>;
}

const RouteToAbout: NextJSRoute = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
  Link: function RouteLink({ urlQuery, ...props }) {
    const to = generateUrl(pattern, {}, urlQuery);
    return <Link href={to} {...props} />;
  },
};

export default RouteToAbout;
