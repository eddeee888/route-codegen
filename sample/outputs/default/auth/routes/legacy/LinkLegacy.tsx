/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import { AnchorProps, CustomAnchor as Link } from "common/ui/Anchor";
import { patternLegacy, UrlPartsLegacy, originLegacy } from "./patternLegacy";
type LinkLegacyProps = Omit<AnchorProps, "href"> & UrlPartsLegacy;
export const LinkLegacy: React.FunctionComponent<LinkLegacyProps> = ({ query, origin, ...props }) => {
  const to = generateUrl({ pattern: patternLegacy, path: {}, query, origin: origin ?? originLegacy });
  return <Link {...props} href={to} />;
};
