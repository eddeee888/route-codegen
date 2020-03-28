import React from 'react';
import { generateUrl } from 'route-codegen';
import { AnchorProps, CustomAnchor as Link } from 'common/ui/Anchor';
import { patternLegacy } from './patternLegacy';
type LinkLegacyProps = Omit<AnchorProps, 'href'>;
const LinkLegacy: React.FunctionComponent<LinkLegacyProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternLegacy, {}, urlQuery);
  return <Link {...props} href={to} />;
};
export default LinkLegacy;
