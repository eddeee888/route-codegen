import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { LinkProps as OriginalLinkProps } from 'common/components/Link';
import { patternSignup } from './patternSignup';
type LinkProps = Omit<OriginalLinkProps, 'to'>;
const LinkSignup: LinkProps = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternSignup, {}, urlQuery);
  return <Link {...props} to={to} />;
};
export default LinkSignup;
