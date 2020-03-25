import React from 'react';
import { generateUrl } from 'route-codegen';

import { patternHome } from './patternHome';
type LinkProps = Omit<
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  'href'
>;
const LinkHome: LinkProps = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternHome, {}, urlQuery);
  return <a {...props} href={to} />;
};
export default LinkHome;
