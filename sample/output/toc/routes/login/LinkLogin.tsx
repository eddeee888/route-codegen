import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { AnchorProps } from 'src/common/ui/Anchor';
import { patternLogin, UrlPartsLogin } from './patternLogin';
type LinkLoginProps = Omit<AnchorProps, 'href'> & UrlPartsLogin;
const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternLogin, {}, urlQuery);
  return <Link {...props} href={to} />;
};
export default LinkLogin;
