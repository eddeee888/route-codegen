import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { LinkProps } from 'react-router-dom';
import { patternAccount } from './patternAccount';
type LinkAccountProps = Omit<LinkProps, 'to'>;
const LinkAccount: React.FunctionComponent<LinkAccountProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternAccount, {}, urlQuery);
  return <Link {...props} to={to} />;
};
export default LinkAccount;
