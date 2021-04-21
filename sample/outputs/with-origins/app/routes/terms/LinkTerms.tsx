/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";

import { patternTerms, UrlPartsTerms, originTerms } from "./patternTerms";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & UrlPartsTerms;
export const LinkTerms: React.FunctionComponent<LinkProps> = ({ query, origin, ...props }) => {
  const to = generateUrl({ pattern: patternTerms, path: {}, query, origin: origin ?? originTerms });
  return <a {...props} href={to} />;
};
