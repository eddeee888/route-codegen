/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import Link, { LinkProps } from "common/components/Link";
import { patternLogin, UrlParamsLogin } from "./patternLogin";
type LinkLoginProps = Omit<LinkProps, "to"> & UrlParamsLogin;
export const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({ query, origin, ...props }) => {
  const to = generateUrl(patternLogin, { path: {}, query, origin });
  return <Link {...props} to={to} />;
};
