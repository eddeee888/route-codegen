import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { AnchorProps as OriginalLinkProps } from 'common/ui/Anchor';
import { patternAbout } from './patternAbout';
type LinkProps = Omit<OriginalLinkProps, 'href'>;
const LinkAbout: LinkProps = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternAbout, {}, urlQuery);
  return <Link {...props} href={to} />;
};
export default LinkAbout;
