import React from 'react';
import { generateUrl } from 'route-codegen';

import { patternToc } from './patternToc';
type LinkProps = Omit<
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  'href'
>;
const LinkToc: React.FunctionComponent<LinkProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternToc, {}, urlQuery);
  return <a {...props} href={to} />;
};
export default LinkToc;
