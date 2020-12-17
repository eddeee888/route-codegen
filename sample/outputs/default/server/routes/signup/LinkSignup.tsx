/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import generateUrl from "route-codegen/generateUrl";

import { patternSignup, UrlPartsSignup, originSignup } from "./patternSignup";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & UrlPartsSignup;
const LinkSignup: React.FunctionComponent<LinkProps> = ({ query, origin, ...props }) => {
  const to = generateUrl(patternSignup, {}, query, origin ?? originSignup);
  return <a {...props} href={to} />;
};
export default LinkSignup;
