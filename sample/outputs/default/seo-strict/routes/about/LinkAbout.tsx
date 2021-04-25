/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";

import { patternAbout, UrlParamsAbout, originAbout } from "./patternAbout";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & {
  urlParams: UrlParamsAbout;
};
export const LinkAbout: React.FunctionComponent<LinkProps> = ({ urlParams, ...props }) => {
  const to = generateUrl(patternAbout, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin ?? originAbout });
  return <a {...props} href={to} />;
};
