/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import Link, { LinkProps } from "next/link";
import { generateUrl } from "@route-codegen/utils";
import { UrlParamsContact, patternContact } from "./patternContact";
type LinkContactProps = Omit<LinkProps, "href"> & { urlParams: UrlParamsContact };
export const LinkContact: React.FunctionComponent<LinkContactProps> = ({ urlParams, ...props }) => {
  const href = generateUrl(patternContact, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin });
  return <Link {...props} href={href} />;
};
