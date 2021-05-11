/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";

import { patternTerms, UrlParamsTerms, originTerms } from "./patternTerms";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & {
  urlParams?: UrlParamsTerms;
};
export const LinkTerms: React.FunctionComponent<LinkProps> = ({ urlParams, ...props }) => {
  const to = generateUrl(patternTerms, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originTerms });
  return <a {...props} href={to} />;
};
