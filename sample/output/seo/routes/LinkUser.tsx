import React from 'react';
import { generateUrl } from 'route-codegen';

import { patternUser } from './patternUser';
type LinkProps = Omit<
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  'href'
>;
const LinkUser: LinkProps = ({ path, urlQuery, ...props }) => {
  const to = generateUrl(patternUser, path, urlQuery);
  return <a {...props} href={to} />;
};
export default LinkUser;
