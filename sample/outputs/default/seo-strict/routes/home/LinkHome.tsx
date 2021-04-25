/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";

import { patternHome, UrlParamsHome, originHome } from "./patternHome";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & {
  urlParams?: UrlParamsHome;
};
export const LinkHome: React.FunctionComponent<LinkProps> = ({ urlParams, ...props }) => {
  const to = generateUrl(patternHome, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originHome });
  return <a {...props} href={to} />;
};
