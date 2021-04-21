/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import Link, { AnchorProps } from "src/common/ui/Anchor";
import { patternSignup, UrlParamsSignup, originSignup } from "./patternSignup";
type LinkSignupProps = Omit<AnchorProps, "href"> & UrlParamsSignup;
export const LinkSignup: React.FunctionComponent<LinkSignupProps> = ({ query, origin, ...props }) => {
  const to = generateUrl(patternSignup, { path: {}, query, origin: origin ?? originSignup });
  return <Link {...props} href={to} />;
};
