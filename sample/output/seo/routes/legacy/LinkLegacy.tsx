import React from 'react';
import { generateUrl } from 'route-codegen';

import { patternLegacy } from './patternLegacy';
type LinkProps = Omit<
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  'href'
>;
const LinkLegacy: LinkProps = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternLegacy, {}, urlQuery);
  return <a {...props} href={to} />;
};
export default LinkLegacy;
