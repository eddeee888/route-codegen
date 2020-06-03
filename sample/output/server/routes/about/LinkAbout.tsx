/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import generateUrl from "route-codegen/generateUrl";

import { patternAbout, UrlPartsAbout, originAbout } from "./patternAbout";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & UrlPartsAbout;
const LinkAbout: React.FunctionComponent<LinkProps> = ({ path, urlQuery, origin, ...props }) => {
  const to = generateUrl(patternAbout, path, urlQuery, origin ?? originAbout);
  return <a {...props} href={to} />;
};
export default LinkAbout;
