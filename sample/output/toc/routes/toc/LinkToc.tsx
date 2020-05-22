/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import generateUrl from "route-codegen/generateUrl";
import Link, { LinkProps } from "src/common/components/Link";
import { patternToc, UrlPartsToc, patternNextJSToc } from "./patternToc";
type LinkTocProps = Omit<LinkProps, "href"> & UrlPartsToc;
const LinkToc: React.FunctionComponent<LinkTocProps> = ({ urlQuery, origin, ...props }) => {
  const to = generateUrl(patternToc, {}, urlQuery, origin);
  return <Link {...props} href={patternNextJSToc} as={to} />;
};
export default LinkToc;
