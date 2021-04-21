/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import { AnchorProps, CustomAnchor as Link } from "common/ui/Anchor";
import { patternAccount, UrlPartsAccount, originAccount } from "./patternAccount";
type LinkAccountProps = Omit<AnchorProps, "href"> & UrlPartsAccount;
export const LinkAccount: React.FunctionComponent<LinkAccountProps> = ({ query, origin, ...props }) => {
  const to = generateUrl({ pattern: patternAccount, path: {}, query, origin: origin ?? originAccount });
  return <Link {...props} href={to} />;
};
