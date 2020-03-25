import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { LinkProps as OriginalLinkProps } from 'next/link';
import { patternHome } from './patternHome';
type LinkProps = Omit<OriginalLinkProps, 'href'>;
const LinkHome: LinkProps = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternHome, {}, urlQuery);
  return <Link {...props} href={to} />;
};
export default LinkHome;
