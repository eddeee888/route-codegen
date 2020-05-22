/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import generateUrl from "route-codegen/generateUrl";
import { AnchorProps, CustomAnchor as Link } from "common/ui/Anchor";
import { patternLegacy, UrlPartsLegacy } from "./patternLegacy";
type LinkLegacyProps = Omit<AnchorProps, "href"> & UrlPartsLegacy;
const LinkLegacy: React.FunctionComponent<LinkLegacyProps> = ({ urlQuery, origin, ...props }) => {
  const to = generateUrl(patternLegacy, {}, urlQuery, origin);
  return <Link {...props} href={to} />;
};
export default LinkLegacy;
