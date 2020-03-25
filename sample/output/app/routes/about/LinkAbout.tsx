import React from 'react';
import { generateUrl } from 'route-codegen';

import { patternAbout } from './patternAbout';
type LinkProps = Omit<
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  'href'
>;
const LinkAbout: LinkProps = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternAbout, {}, urlQuery);
  return <a {...props} href={to} />;
};
export default LinkAbout;
