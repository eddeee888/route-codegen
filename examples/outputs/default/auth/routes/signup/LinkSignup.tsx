/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import Link, { LinkProps } from "~/common/components/Link";
import { patternSignup, UrlParamsSignup } from "./patternSignup";
type LinkSignupProps = Omit<LinkProps, "href"> & { urlParams?: UrlParamsSignup };
export const LinkSignup: React.FunctionComponent<LinkSignupProps> = ({ urlParams, ...props }) => {
  const to = generateUrl(patternSignup, { path: {}, query: urlParams?.query, origin: urlParams?.origin });
  return <Link {...props} href={to} />;
};
