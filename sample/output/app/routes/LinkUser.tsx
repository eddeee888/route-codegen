import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { LinkProps as OriginalLinkProps } from 'react-router-dom';
import { patternUser } from './patternUser';
type LinkProps = Omit<OriginalLinkProps, 'to'>;
const LinkUser: LinkProps = ({ path, urlQuery, ...props }) => {
  const to = generateUrl(patternUser, path, urlQuery);
  return <Link {...props} to={to} />;
};
export default LinkUser;
