import React from 'react';
import { generateUrl } from 'route-codegen';

import { patternLogin, UrlPartsLogin } from './patternLogin';
type LinkProps = Omit<
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  'href'
> &
  UrlPartsLogin;
const LinkLogin: React.FunctionComponent<LinkProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternLogin, {}, urlQuery);
  return <a {...props} href={to} />;
};
export default LinkLogin;
