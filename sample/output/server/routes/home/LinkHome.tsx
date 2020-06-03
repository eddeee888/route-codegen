/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import generateUrl from "route-codegen/generateUrl";

import { patternHome, UrlPartsHome, originHome } from "./patternHome";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & UrlPartsHome;
const LinkHome: React.FunctionComponent<LinkProps> = ({ urlQuery, origin, ...props }) => {
  const to = generateUrl(patternHome, {}, urlQuery, origin ?? originHome);
  return <a {...props} href={to} />;
};
export default LinkHome;
