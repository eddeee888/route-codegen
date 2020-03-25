import React from 'react';
import { generateUrl } from 'route-codegen';
import a, { AnchorProps as OriginalLinkProps } from 'common/ui/Anchor';
import { patternAccount } from './patternAccount';
type LinkProps = Omit<OriginalLinkProps, 'href'>;
const LinkAccount: LinkProps = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternAccount, {}, urlQuery);
  return <a {...props} href={to} />;
};
export default LinkAccount;
