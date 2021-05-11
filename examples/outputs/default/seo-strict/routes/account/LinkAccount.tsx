/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";

import { patternAccount, UrlParamsAccount, originAccount } from "./patternAccount";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & {
  urlParams?: UrlParamsAccount;
};
export const LinkAccount: React.FunctionComponent<LinkProps> = ({ urlParams, ...props }) => {
  const to = generateUrl(patternAccount, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originAccount });
  return <a {...props} href={to} />;
};
