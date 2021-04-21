/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";

import { patternLogin, UrlParamsLogin, originLogin } from "./patternLogin";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & UrlParamsLogin;
export const LinkLogin: React.FunctionComponent<LinkProps> = ({ query, origin, ...props }) => {
  const to = generateUrl(patternLogin, { path: {}, query, origin: origin ?? originLogin });
  return <a {...props} href={to} />;
};
