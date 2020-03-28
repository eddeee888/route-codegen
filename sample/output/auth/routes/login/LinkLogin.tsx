import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { LinkProps } from 'common/components/Link';
import { patternLogin, UrlPartsLogin } from './patternLogin';
type LinkLoginProps = Omit<LinkProps, 'to'> & UrlPartsLogin;
const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternLogin, {}, urlQuery);
  return <Link {...props} to={to} />;
};
export default LinkLogin;
