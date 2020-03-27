import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { LinkProps } from 'react-router-dom';
import { patternSignup } from './patternSignup';
type LinkSignupProps = Omit<LinkProps, 'to'>;
const LinkSignup: React.FunctionComponent<LinkSignupProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternSignup, {}, urlQuery);
  return <Link {...props} to={to} />;
};
export default LinkSignup;
