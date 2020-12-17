/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import generateUrl from "route-codegen/generateUrl";
import Link, { AnchorProps } from "src/common/ui/Anchor";
import { patternLogin, UrlPartsLogin, originLogin } from "./patternLogin";
type LinkLoginProps = Omit<AnchorProps, "href"> & UrlPartsLogin;
const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({ query, origin, ...props }) => {
  const to = generateUrl(patternLogin, {}, query, origin ?? originLogin);
  return <Link {...props} href={to} />;
};
export default LinkLogin;