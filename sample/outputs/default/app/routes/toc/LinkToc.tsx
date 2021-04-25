/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";

import { patternToc, UrlParamsToc, originToc } from "./patternToc";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & {
  urlParams?: UrlParamsToc;
};
export const LinkToc: React.FunctionComponent<LinkProps> = ({ urlParams, ...props }) => {
  const to = generateUrl(patternToc, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originToc });
  return <a {...props} href={to} />;
};
