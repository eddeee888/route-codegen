import React from 'react';
import { generateUrl } from 'route-codegen';
import { LinkProps, Link } from 'react-router-dom';
import { patternAccount, UrlPartsAccount } from './patternAccount';
type LinkAccountProps = Omit<LinkProps, 'to'> & UrlPartsAccount;
const LinkAccount: React.FunctionComponent<LinkAccountProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternAccount, {}, urlQuery);
  return <Link {...props} to={to} />;
};
export default LinkAccount;
