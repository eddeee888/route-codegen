import React from 'react';
import { generateUrl } from 'route-codegen';

import { patternSignup, UrlPartsSignup } from './patternSignup';
type LinkProps = Omit<
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  'href'
> &
  UrlPartsSignup;
const LinkSignup: React.FunctionComponent<LinkProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternSignup, {}, urlQuery);
  return <a {...props} href={to} />;
};
export default LinkSignup;
