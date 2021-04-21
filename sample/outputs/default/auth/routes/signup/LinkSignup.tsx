/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import Link, { LinkProps } from "common/components/Link";
import { patternSignup, UrlPartsSignup } from "./patternSignup";
type LinkSignupProps = Omit<LinkProps, "to"> & UrlPartsSignup;
export const LinkSignup: React.FunctionComponent<LinkSignupProps> = ({ query, origin, ...props }) => {
  const to = generateUrl({ pattern: patternSignup, path: {}, query, origin });
  return <Link {...props} to={to} />;
};
