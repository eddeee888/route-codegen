/* This file was automatically generated with route-codegen and should not be edited. */
import React from 'react';
import { generateUrl } from 'route-codegen';
import { AnchorProps, CustomAnchor as Link } from 'common/ui/Anchor';
import { patternAbout, UrlPartsAbout } from './patternAbout';
type LinkAboutProps = Omit<AnchorProps, 'href'> & UrlPartsAbout;
const LinkAbout: React.FunctionComponent<LinkAboutProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternAbout, {}, urlQuery);
  return <Link {...props} href={to} />;
};
export default LinkAbout;
