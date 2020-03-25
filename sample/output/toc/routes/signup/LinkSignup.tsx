import React from 'react';
import { generateUrl } from 'route-codegen';
import a, { AnchorProps as OriginalLinkProps } from 'src/common/ui/Anchor';
import { patternSignup } from './patternSignup';
type LinkProps = Omit<OriginalLinkProps, 'href'>;
const LinkSignup: LinkProps = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternSignup, {}, urlQuery);
  return <a {...props} href={to} />;
};
export default LinkSignup;
