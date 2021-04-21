/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import { AnchorProps, CustomAnchor as Link } from "common/ui/Anchor";
import { patternHome, UrlPartsHome, originHome } from "./patternHome";
type LinkHomeProps = Omit<AnchorProps, "href"> & UrlPartsHome;
export const LinkHome: React.FunctionComponent<LinkHomeProps> = ({ query, origin, ...props }) => {
  const to = generateUrl(patternHome, { path: {}, query, origin: origin ?? originHome });
  return <Link {...props} href={to} />;
};
