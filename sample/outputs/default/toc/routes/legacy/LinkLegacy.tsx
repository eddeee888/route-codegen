/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import Link, { AnchorProps } from "src/common/ui/Anchor";
import { patternLegacy, UrlParamsLegacy, originLegacy } from "./patternLegacy";
type LinkLegacyProps = Omit<AnchorProps, "href"> & UrlParamsLegacy;
export const LinkLegacy: React.FunctionComponent<LinkLegacyProps> = ({ query, origin, ...props }) => {
  const to = generateUrl(patternLegacy, { path: {}, query, origin: origin ?? originLegacy });
  return <Link {...props} href={to} />;
};
