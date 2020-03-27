import React from 'react';
import { generateUrl } from 'route-codegen';

import { patternLogin } from './patternLogin';
type LinkProps = Omit<
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  'href'
>;
const LinkLogin: LinkProps = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternLogin, {}, urlQuery);
  return <a {...props} href={to} />;
};
export default LinkLogin;
