import React from 'react';
import { generateUrl } from 'route-codegen';
import a, { AnchorProps as OriginalLinkProps } from 'common/ui/Anchor';
import { patternToc } from './patternToc';
type LinkProps = Omit<OriginalLinkProps, 'href'>;
const LinkToc: LinkProps = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternToc, {}, urlQuery);
  return <a {...props} href={to} />;
};
export default LinkToc;
