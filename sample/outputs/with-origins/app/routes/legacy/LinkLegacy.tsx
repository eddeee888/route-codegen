/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";

import { patternLegacy, UrlParamsLegacy, originLegacy } from "./patternLegacy";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & {
  urlParams?: UrlParamsLegacy;
};
export const LinkLegacy: React.FunctionComponent<LinkProps> = ({ urlParams, ...props }) => {
  const to = generateUrl(patternLegacy, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originLegacy });
  return <a {...props} href={to} />;
};
