/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import Link, { AnchorProps } from "src/common/ui/Anchor";
import { patternAccount, UrlPartsAccount, originAccount } from "./patternAccount";
type LinkAccountProps = Omit<AnchorProps, "href"> & UrlPartsAccount;
const LinkAccount: React.FunctionComponent<LinkAccountProps> = ({ query, origin, ...props }) => {
  const to = generateUrl(patternAccount, {}, query, origin ?? originAccount);
  return <Link {...props} href={to} />;
};
export default LinkAccount;
