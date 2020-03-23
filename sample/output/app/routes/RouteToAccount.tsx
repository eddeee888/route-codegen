/* This file was automatically generated and should not be edited. */
import React from 'react';
import Link, { LinkProps as OriginalLinkProps } from 'react-router-dom';
import { generateUrl } from 'route-codegen';
import { useHistory } from 'react-router';
import { patternAccount as pattern } from './patternAccount';

type OmittedLinkProps = Omit<OriginalLinkProps, 'to'>;

interface UrlParts {
  urlQuery?: Partial<Record<string, string>>;
}

type RouteLinkProps = OmittedLinkProps & UrlParts;

interface ReactRouterV5Route {
  pattern: string;
  generate: (urlParts: UrlParts) => string;
  Link: React.FunctionComponent<RouteLinkProps>;
  useRedirect: (urlParts: UrlParts) => () => void;
}

const RouteToAccount: ReactRouterV5Route = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
  Link: function RouteLink({ urlQuery, ...props }) {
    const to = generateUrl(pattern, {}, urlQuery);
    return <Link to={to} {...props} />;
  },

  useRedirect: ({ urlQuery }) => {
    const history = useHistory();
    const to = generateUrl(pattern, {}, urlQuery);
    return () => history.push(to);
  },
};

export default RouteToAccount;
