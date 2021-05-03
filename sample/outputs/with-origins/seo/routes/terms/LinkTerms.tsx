/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import Link, { LinkProps } from "next/link";
import { generateUrl } from "@route-codegen/utils";
import { UrlParamsTerms, patternTerms } from "./patternTerms";
type LinkTermsProps = Omit<LinkProps, "href"> & { urlParams?: UrlParamsTerms };
export const LinkTerms: React.FunctionComponent<LinkTermsProps> = ({ urlParams, ...props }) => {
  const href = generateUrl(patternTerms, { path: {}, query: urlParams?.query, origin: urlParams?.origin });
  return <Link {...props} href={href} />;
};
