/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";

import { patternUser, UrlParamsUser, originUser } from "./patternUser";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & {
  urlParams: UrlParamsUser;
};
export const LinkUser: React.FunctionComponent<LinkProps> = ({ urlParams, ...props }) => {
  const to = generateUrl(patternUser, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin ?? originUser });
  return <a {...props} href={to} />;
};
