import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { AnchorProps } from 'common/ui/Anchor';
import { patternAccount } from './patternAccount';
type LinkAccountProps = Omit<AnchorProps, 'href'>;
const LinkAccount: React.FunctionComponent<LinkAccountProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternAccount, {}, urlQuery);
  return <Link {...props} href={to} />;
};
export default LinkAccount;
