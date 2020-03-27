import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { AnchorProps } from 'src/common/ui/Anchor';
import { patternAbout } from './patternAbout';
type LinkAboutProps = Omit<AnchorProps, 'href'>;
const LinkAbout: React.FunctionComponent<LinkAboutProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternAbout, {}, urlQuery);
  return <Link {...props} href={to} />;
};
export default LinkAbout;
