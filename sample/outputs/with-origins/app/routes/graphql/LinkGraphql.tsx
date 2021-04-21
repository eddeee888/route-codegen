/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";

import { patternGraphql, UrlParamsGraphql, originGraphql } from "./patternGraphql";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & UrlParamsGraphql;
export const LinkGraphql: React.FunctionComponent<LinkProps> = ({ query, origin, ...props }) => {
  const to = generateUrl(patternGraphql, { path: {}, query, origin: origin ?? originGraphql });
  return <a {...props} href={to} />;
};
