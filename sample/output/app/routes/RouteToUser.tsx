/* This file was automatically generated and should not be edited. */
import React from 'react';
import Link, { LinkProps as OriginalLinkProps } from 'react-router-dom';
import { generateUrl } from 'route-codegen';
import { useRouteMatch, useHistory } from 'react-router';
import { patternUser as pattern, UserPathParams } from './patternUser';

type OmittedLinkProps = Omit<OriginalLinkProps, 'to'>;

interface UrlParts<P> {
  path: P;
  urlQuery?: Partial<Record<string, string>>;
}

type RouteLinkProps<P> = OmittedLinkProps & UrlParts<P>;

interface ReactRouterV5Route<P> {
  pattern: string;
  generate: (urlParts: UrlParts<P>) => string;
  Link: React.FunctionComponent<RouteLinkProps<P>>;
  useParams: () => P;
  useRedirect: (urlParts: UrlParts<P>) => () => void;
}

const RouteToUser: ReactRouterV5Route<UserPathParams> = {
  pattern,
  generate: ({ path, urlQuery }) => generateUrl(pattern, path, urlQuery),
  Link: function RouteLink({ path, urlQuery, ...props }) {
    const to = generateUrl(pattern, path, urlQuery);
    return <Link {...props} to={to} />;
  },
  useParams: () => {
    const { path, params } = useRouteMatch<UserPathParams>();

    if (path !== pattern) {
      const error = `You are trying to use useParams for "${pattern}" in "${path}". Make sure you are using the right route link object!`;
      throw new Error(error);
    }

    return params;
  },
  useRedirect: ({ path, urlQuery }) => {
    const history = useHistory();
    const to = generateUrl(pattern, path, urlQuery);
    return () => history.push(to);
  },
};

export default RouteToUser;
