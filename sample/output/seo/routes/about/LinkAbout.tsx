import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { LinkProps } from 'next/link';
import { patternAbout, UrlPartsAbout } from './patternAbout';
type LinkAboutProps = Omit<LinkProps, 'href'> & UrlPartsAbout;
const LinkAbout: React.FunctionComponent<LinkAboutProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternAbout, {}, urlQuery);
  return <Link {...props} href={to} />;
};
export default LinkAbout;
