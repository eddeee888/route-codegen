/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import { LinkProps, Link } from "react-router-dom";
import { patternUser, UrlParamsUser } from "./patternUser";
type LinkUserProps = Omit<LinkProps, "to"> & { urlParams: UrlParamsUser };
export const LinkUser: React.FunctionComponent<LinkUserProps> = ({ urlParams, ...props }) => {
  const to = generateUrl(patternUser, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin });
  return <Link {...props} to={to} />;
};
