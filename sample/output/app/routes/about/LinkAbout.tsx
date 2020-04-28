/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "route-codegen";

import { patternAbout, UrlPartsAbout } from "./patternAbout";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & UrlPartsAbout;
const LinkAbout: React.FunctionComponent<LinkProps> = ({ path, urlQuery, ...props }) => {
  const to = generateUrl(patternAbout, path, urlQuery);
  return <a {...props} href={to} />;
};
export default LinkAbout;
