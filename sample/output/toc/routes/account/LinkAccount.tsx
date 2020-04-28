/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "route-codegen";
import Link, { AnchorProps } from "src/common/ui/Anchor";
import { patternAccount, UrlPartsAccount } from "./patternAccount";
type LinkAccountProps = Omit<AnchorProps, "href"> & UrlPartsAccount;
const LinkAccount: React.FunctionComponent<LinkAccountProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternAccount, {}, urlQuery);
  return <Link {...props} href={to} />;
};
export default LinkAccount;
