/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import { AnchorProps, CustomAnchor as Link } from "~/common/components/Anchor";
import { patternLegacy, UrlParamsLegacy, originLegacy } from "./patternLegacy";
type LinkLegacyProps = Omit<AnchorProps, "href"> & { urlParams?: UrlParamsLegacy };
export const LinkLegacy: React.FunctionComponent<LinkLegacyProps> = ({ urlParams, ...props }) => {
  const to = generateUrl(patternLegacy, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originLegacy });
  return <Link {...props} href={to} />;
};
