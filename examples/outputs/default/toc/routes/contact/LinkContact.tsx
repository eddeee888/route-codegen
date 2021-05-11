/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import Link, { AnchorProps } from "~/common/components/Anchor";
import { patternContact, UrlParamsContact, originContact } from "./patternContact";
type LinkContactProps = Omit<AnchorProps, "href"> & { urlParams: UrlParamsContact };
export const LinkContact: React.FunctionComponent<LinkContactProps> = ({ urlParams, ...props }) => {
  const to = generateUrl(patternContact, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin ?? originContact });
  return <Link {...props} href={to} />;
};
