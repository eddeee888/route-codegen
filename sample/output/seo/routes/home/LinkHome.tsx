/* This file was automatically generated with route-codegen and should not be edited. */
import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { LinkProps } from 'next/link';
import { patternHome, UrlPartsHome } from './patternHome';
type LinkHomeProps = Omit<LinkProps, 'href'> & UrlPartsHome;
const LinkHome: React.FunctionComponent<LinkHomeProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternHome, {}, urlQuery);
  return <Link {...props} href={to} />;
};
export default LinkHome;
