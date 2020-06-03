/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import generateUrl from "route-codegen/generateUrl";

import { patternGraphql, UrlPartsGraphql, originGraphql } from "./patternGraphql";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & UrlPartsGraphql;
const LinkGraphql: React.FunctionComponent<LinkProps> = ({ urlQuery, origin, ...props }) => {
  const to = generateUrl(patternGraphql, {}, urlQuery, origin ?? originGraphql);
  return <a {...props} href={to} />;
};
export default LinkGraphql;
