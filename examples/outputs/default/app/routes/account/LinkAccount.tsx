/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import { LinkProps, Link } from "react-router-dom";
import { patternAccount, UrlParamsAccount } from "./patternAccount";
type LinkAccountProps = Omit<LinkProps, "to"> & { urlParams?: UrlParamsAccount };
export const LinkAccount: React.FunctionComponent<LinkAccountProps> = ({ urlParams, ...props }) => {
  const to = generateUrl(patternAccount, { path: {}, query: urlParams?.query, origin: urlParams?.origin });
  return <Link {...props} to={to} />;
};
