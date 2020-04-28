/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "route-codegen";

import { patternToc, UrlPartsToc } from "./patternToc";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & UrlPartsToc;
const LinkToc: React.FunctionComponent<LinkProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternToc, {}, urlQuery);
  return <a {...props} href={to} />;
};
export default LinkToc;
