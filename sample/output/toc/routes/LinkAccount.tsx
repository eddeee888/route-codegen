import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { AnchorProps as OriginalLinkProps } from 'src/common/ui/Anchor';
import { patternAccount } from './patternAccount';
type LinkProps = Omit<OriginalLinkProps, 'href'>;
const LinkAccount: LinkProps = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternAccount, {}, urlQuery);
  return <Link {...props} href={to} />;
};
export default LinkAccount;
