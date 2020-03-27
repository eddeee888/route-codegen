import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { LinkProps } from 'common/components/Link';
import { patternLogin } from './patternLogin';
type LinkLoginProps = Omit<LinkProps, 'to'>;
const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternLogin, {}, urlQuery);
  return <Link {...props} to={to} />;
};
export default LinkLogin;
