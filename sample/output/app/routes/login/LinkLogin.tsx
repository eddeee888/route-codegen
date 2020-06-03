/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import generateUrl from "route-codegen/generateUrl";

import { patternLogin, UrlPartsLogin, originLogin } from "./patternLogin";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & UrlPartsLogin;
const LinkLogin: React.FunctionComponent<LinkProps> = ({ urlQuery, origin, ...props }) => {
  const to = generateUrl(patternLogin, {}, urlQuery, origin ?? originLogin);
  return <a {...props} href={to} />;
};
export default LinkLogin;
