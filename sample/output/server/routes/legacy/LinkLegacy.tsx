/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "route-codegen";

import { patternLegacy, UrlPartsLegacy } from "./patternLegacy";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & UrlPartsLegacy;
const LinkLegacy: React.FunctionComponent<LinkProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternLegacy, {}, urlQuery);
  return <a {...props} href={to} />;
};
export default LinkLegacy;
