import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { AnchorProps as OriginalLinkProps } from 'src/common/ui/Anchor';
import { patternLogin } from './patternLogin';
type LinkProps = Omit<OriginalLinkProps, 'href'>;
const LinkLogin: LinkProps = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternLogin, {}, urlQuery);
  return <Link {...props} href={to} />;
};
export default LinkLogin;
