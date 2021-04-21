/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";

import { patternAbout, UrlPartsAbout, originAbout } from "./patternAbout";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & UrlPartsAbout;
export const LinkAbout: React.FunctionComponent<LinkProps> = ({ path, query, origin, ...props }) => {
  const to = generateUrl({ pattern: patternAbout, path: path, query, origin: origin ?? originAbout });
  return <a {...props} href={to} />;
};
