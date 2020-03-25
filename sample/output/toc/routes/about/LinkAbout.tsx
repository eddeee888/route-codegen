import React from 'react';
import { generateUrl } from 'route-codegen';
import a, { AnchorProps as OriginalLinkProps } from 'src/common/ui/Anchor';
import { patternAbout } from './patternAbout';
type LinkProps = Omit<OriginalLinkProps, 'href'>;
const LinkAbout: LinkProps = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternAbout, {}, urlQuery);
  return <a {...props} href={to} />;
};
export default LinkAbout;
