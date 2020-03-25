import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { LinkProps as OriginalLinkProps } from 'common/components/Link';
import { patternLogin } from './patternLogin';
type LinkProps = Omit<OriginalLinkProps, 'to'>;
const LinkLogin: LinkProps = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternLogin, {}, urlQuery);
  return <Link {...props} to={to} />;
};
export default LinkLogin;
