/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";

import { patternToc, UrlPartsToc, originToc } from "./patternToc";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & UrlPartsToc;
export const LinkToc: React.FunctionComponent<LinkProps> = ({ query, origin, ...props }) => {
  const to = generateUrl(patternToc, { path: {}, query, origin: origin ?? originToc });
  return <a {...props} href={to} />;
};
