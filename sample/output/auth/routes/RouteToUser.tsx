/* This file was automatically generated and should not be edited. */
import React from 'react';
import Link, { AnchorProps as OriginalLinkProps } from 'common/ui/Anchor';
import { generateUrl } from 'route-codegen';
import { patternUser as pattern, UrlPartsUser, PathParamsUser } from './patternUser';

type OmittedLinkProps = Omit<OriginalLinkProps, 'href'>;

type RouteLinkProps = OmittedLinkProps & UrlPartsUser;

interface DefaultRoute<P> {
  pattern: string;
  generate: (urlParts: UrlPartsUser) => string;
  Link: React.FunctionComponent<RouteLinkProps<P>>;
}

const RouteToUser: DefaultRoute<PathParamsUser> = {
  pattern,
  generate: ({ path, urlQuery }) => generateUrl(pattern, path, urlQuery),
  Link: function RouteLink({ path, urlQuery, ...props }) {
    const to = generateUrl(pattern, path, urlQuery);
    return <Link {...props} href={to} />;
  },
};

export default RouteToUser;
