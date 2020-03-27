import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { AnchorProps } from 'src/common/ui/Anchor';
import { patternSignup } from './patternSignup';
type LinkSignupProps = Omit<AnchorProps, 'href'>;
const LinkSignup: React.FunctionComponent<LinkSignupProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternSignup, {}, urlQuery);
  return <Link {...props} href={to} />;
};
export default LinkSignup;
