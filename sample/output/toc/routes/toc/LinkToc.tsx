/* This file was automatically generated with route-codegen and should not be edited. */
import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { LinkProps } from 'src/common/components/Link';
import { patternToc, UrlPartsToc, patternNextJSToc } from './patternToc';
type LinkTocProps = Omit<LinkProps, 'href'> & UrlPartsToc;
const LinkToc: React.FunctionComponent<LinkTocProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternToc, {}, urlQuery);
  return <Link {...props} href={patternNextJSToc} as={to} />;
};
export default LinkToc;
