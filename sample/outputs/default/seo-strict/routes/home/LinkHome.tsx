/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";

import { patternHome, UrlPartsHome, originHome } from "./patternHome";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & UrlPartsHome;
export const LinkHome: React.FunctionComponent<LinkProps> = ({ query, origin, ...props }) => {
  const to = generateUrl({ pattern: patternHome, path: {}, query, origin: origin ?? originHome });
  return <a {...props} href={to} />;
};
