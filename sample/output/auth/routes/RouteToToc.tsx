/* This file was automatically generated and should not be edited. */
import React from 'react';
import Link, { AnchorProps as OriginalLinkProps } from 'common/ui/Anchor';
import { generateUrl } from 'route-codegen';
import { patternToc as pattern, UrlPartsToc } from './patternToc';

type OmittedLinkProps = Omit<OriginalLinkProps, 'href'>;

type RouteLinkProps = OmittedLinkProps & UrlPartsToc;

interface DefaultRoute {
  pattern: string;
  generate: (urlParts: UrlPartsToc) => string;
  Link: React.FunctionComponent<RouteLinkProps>;
}

const RouteToToc: DefaultRoute = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
  Link: function RouteLink({ urlQuery, ...props }) {
    const to = generateUrl(pattern, {}, urlQuery);
    return <Link href={to} {...props} />;
  },
};

export default RouteToToc;
