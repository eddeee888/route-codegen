/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import { AnchorProps, CustomAnchor as Link } from "common/ui/Anchor";
import { patternAccount, UrlParamsAccount, originAccount } from "./patternAccount";
type LinkAccountProps = Omit<AnchorProps, "href"> & { urlParams?: UrlParamsAccount };
export const LinkAccount: React.FunctionComponent<LinkAccountProps> = ({ urlParams, ...props }) => {
  const to = generateUrl(patternAccount, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originAccount });
  return <Link {...props} href={to} />;
};
