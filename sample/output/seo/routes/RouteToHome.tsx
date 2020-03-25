/* This file was automatically generated and should not be edited. */
import React from 'react';
import Link, { LinkProps as OriginalLinkProps } from 'next/link';
import { generateUrl } from 'route-codegen';
import { patternHome as pattern, UrlPartsHome } from './patternHome';

type OmittedLinkProps = Omit<OriginalLinkProps, 'href'>;

type RouteLinkProps = OmittedLinkProps & UrlPartsHome;

interface NextJSRoute {
  pattern: string;
  generate: (urlParts: UrlPartsHome) => string;
  Link: React.FunctionComponent<RouteLinkProps>;
}

const RouteToHome: NextJSRoute = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
  Link: function RouteLink({ urlQuery, ...props }) {
    const to = generateUrl(pattern, {}, urlQuery);
    return <Link href={to} {...props} />;
  },
};

export default RouteToHome;
