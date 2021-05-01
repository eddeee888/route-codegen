/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import Link, { LinkProps } from "~/common/components/Link";
import { patternLogin, UrlParamsLogin } from "./patternLogin";
type LinkLoginProps = Omit<LinkProps, "to"> & { urlParams?: UrlParamsLogin };
export const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({ urlParams, ...props }) => {
  const to = generateUrl(patternLogin, { path: {}, query: urlParams?.query, origin: urlParams?.origin });
  return <Link {...props} to={to} />;
};
