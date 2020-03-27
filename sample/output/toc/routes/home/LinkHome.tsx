import React from 'react';
import { generateUrl } from 'route-codegen';
import a, { AnchorProps as OriginalLinkProps } from 'src/common/ui/Anchor';
import { patternHome } from './patternHome';
type LinkProps = Omit<OriginalLinkProps, 'href'>;
const LinkHome: LinkProps = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternHome, {}, urlQuery);
  return <a {...props} href={to} />;
};
export default LinkHome;
