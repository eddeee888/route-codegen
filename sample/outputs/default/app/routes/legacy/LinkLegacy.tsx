/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";

import { patternLegacy, UrlPartsLegacy, originLegacy } from "./patternLegacy";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & UrlPartsLegacy;
export const LinkLegacy: React.FunctionComponent<LinkProps> = ({ query, origin, ...props }) => {
  const to = generateUrl(patternLegacy, { path: {}, query, origin: origin ?? originLegacy });
  return <a {...props} href={to} />;
};
