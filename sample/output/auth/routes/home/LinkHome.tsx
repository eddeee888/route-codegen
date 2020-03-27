import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { AnchorProps } from 'common/ui/Anchor';
import { patternHome } from './patternHome';
type LinkHomeProps = Omit<AnchorProps, 'href'>;
const LinkHome: React.FunctionComponent<LinkHomeProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternHome, {}, urlQuery);
  return <Link {...props} href={to} />;
};
export default LinkHome;
