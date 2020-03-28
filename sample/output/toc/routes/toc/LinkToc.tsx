import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { LinkProps } from 'src/common/components/Link';
import { patternToc } from './patternToc';
type LinkTocProps = Omit<LinkProps, 'href'>;
const LinkToc: React.FunctionComponent<LinkTocProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternToc, {}, urlQuery);
  return <Link {...props} href={to} />;
};
export default LinkToc;
