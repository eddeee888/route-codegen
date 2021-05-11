/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";

import { patternGraphql, UrlParamsGraphql, originGraphql } from "./patternGraphql";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & {
  urlParams?: UrlParamsGraphql;
};
export const LinkGraphql: React.FunctionComponent<LinkProps> = ({ urlParams, ...props }) => {
  const to = generateUrl(patternGraphql, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originGraphql });
  return <a {...props} href={to} />;
};
