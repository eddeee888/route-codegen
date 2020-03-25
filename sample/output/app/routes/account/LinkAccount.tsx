import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { LinkProps as OriginalLinkProps } from 'react-router-dom';
import { patternAccount } from './patternAccount';
type LinkProps = Omit<OriginalLinkProps, 'to'>;
const LinkAccount: LinkProps = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternAccount, {}, urlQuery);
  return <Link {...props} to={to} />;
};
export default LinkAccount;
