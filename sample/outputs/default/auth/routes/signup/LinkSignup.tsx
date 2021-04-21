/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import Link, { LinkProps } from "common/components/Link";
import { patternSignup, UrlParamsSignup } from "./patternSignup";
type LinkSignupProps = Omit<LinkProps, "to"> & UrlParamsSignup;
export const LinkSignup: React.FunctionComponent<LinkSignupProps> = ({ query, origin, ...props }) => {
  const to = generateUrl(patternSignup, { path: {}, query, origin });
  return <Link {...props} to={to} />;
};
