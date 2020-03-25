import React from 'react';
import { generateUrl } from 'route-codegen';
import a, { AnchorProps as OriginalLinkProps } from 'common/ui/Anchor';
import { patternUser } from './patternUser';
type LinkProps = Omit<OriginalLinkProps, 'href'>;
const LinkUser: LinkProps = ({ path, urlQuery, ...props }) => {
  const to = generateUrl(patternUser, path, urlQuery);
  return <a {...props} href={to} />;
};
export default LinkUser;
