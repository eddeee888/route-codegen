import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { LinkProps } from 'react-router-dom';
import { patternUser } from './patternUser';
type LinkUserProps = Omit<LinkProps, 'to'>;
const LinkUser: React.FunctionComponent<LinkUserProps> = ({ path, urlQuery, ...props }) => {
  const to = generateUrl(patternUser, path, urlQuery);
  return <Link {...props} to={to} />;
};
export default LinkUser;
