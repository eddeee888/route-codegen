/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import Link, { AnchorProps } from "src/common/ui/Anchor";
import { patternLogin, UrlPartsLogin, originLogin } from "./patternLogin";
type LinkLoginProps = Omit<AnchorProps, "href"> & UrlPartsLogin;
export const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({ query, origin, ...props }) => {
  const to = generateUrl({ pattern: patternLogin, path: {}, query, origin: origin ?? originLogin });
  return <Link {...props} href={to} />;
};
