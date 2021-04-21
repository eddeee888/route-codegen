/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";

import { patternSignup, UrlParamsSignup, originSignup } from "./patternSignup";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & UrlParamsSignup;
export const LinkSignup: React.FunctionComponent<LinkProps> = ({ query, origin, ...props }) => {
  const to = generateUrl(patternSignup, { path: {}, query, origin: origin ?? originSignup });
  return <a {...props} href={to} />;
};
