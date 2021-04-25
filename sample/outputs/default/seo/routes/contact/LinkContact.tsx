/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";

import { patternContact, UrlParamsContact, originContact } from "./patternContact";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & {
  urlParams: UrlParamsContact;
};
export const LinkContact: React.FunctionComponent<LinkProps> = ({ urlParams, ...props }) => {
  const to = generateUrl(patternContact, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin ?? originContact });
  return <a {...props} href={to} />;
};
