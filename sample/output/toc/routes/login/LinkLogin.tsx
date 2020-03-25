import React from 'react';
import { generateUrl } from 'route-codegen';
import a, { AnchorProps as OriginalLinkProps } from 'src/common/ui/Anchor';
import { patternLogin } from './patternLogin';
type LinkProps = Omit<OriginalLinkProps, 'href'>;
const LinkLogin: LinkProps = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternLogin, {}, urlQuery);
  return <a {...props} href={to} />;
};
export default LinkLogin;
