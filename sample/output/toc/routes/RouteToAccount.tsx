/* This file was automatically generated and should not be edited. */
import React from 'react';
import Link, { AnchorProps as OriginalLinkProps } from 'src/common/ui/Anchor';
import { generateUrl } from 'route-codegen';
import { patternAccount as pattern, UrlPartsAccount } from './patternAccount';

type OmittedLinkProps = Omit<OriginalLinkProps, 'href'>;

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
    return <Link href={to} {...props} />;
  },
};

export default RouteToAccount;
