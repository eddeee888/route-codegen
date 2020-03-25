/* This file was automatically generated and should not be edited. */
import React from 'react';
import Link, { AnchorProps as OriginalLinkProps } from 'src/common/ui/Anchor';
import { generateUrl } from 'route-codegen';
import { patternLogin as pattern, UrlPartsLogin } from './patternLogin';

type OmittedLinkProps = Omit<OriginalLinkProps, 'href'>;

type RouteLinkProps = OmittedLinkProps & UrlPartsLogin;

interface DefaultRoute {
  pattern: string;
  generate: (urlParts: UrlPartsLogin) => string;
  Link: React.FunctionComponent<RouteLinkProps>;
}

const RouteToLogin: DefaultRoute = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
  Link: function RouteLink({ urlQuery, ...props }) {
    const to = generateUrl(pattern, {}, urlQuery);
    return <Link href={to} {...props} />;
  },
};

export default RouteToLogin;
