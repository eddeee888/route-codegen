/* This file was automatically generated and should not be edited. */
import React from 'react';
import Link, { AnchorProps as OriginalLinkProps } from 'src/common/ui/Anchor';
import { generateUrl } from 'route-codegen';
import { patternSignup as pattern, UrlPartsSignup } from './patternSignup';

type OmittedLinkProps = Omit<OriginalLinkProps, 'href'>;

type RouteLinkProps = OmittedLinkProps & UrlPartsSignup;

interface DefaultRoute {
  pattern: string;
  generate: (urlParts: UrlPartsSignup) => string;
  Link: React.FunctionComponent<RouteLinkProps>;
}

const RouteToSignup: DefaultRoute = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
  Link: function RouteLink({ urlQuery, ...props }) {
    const to = generateUrl(pattern, {}, urlQuery);
    return <Link href={to} {...props} />;
  },
};

export default RouteToSignup;
