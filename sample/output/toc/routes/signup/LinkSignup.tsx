/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import generateUrl from "route-codegen/generateUrl";
import Link, { AnchorProps } from "src/common/ui/Anchor";
import { patternSignup, UrlPartsSignup } from "./patternSignup";
type LinkSignupProps = Omit<AnchorProps, "href"> & UrlPartsSignup;
const LinkSignup: React.FunctionComponent<LinkSignupProps> = ({ urlQuery, origin, ...props }) => {
  const to = generateUrl(patternSignup, {}, urlQuery, origin);
  return <Link {...props} href={to} />;
};
export default LinkSignup;
