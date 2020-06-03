/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import generateUrl from "route-codegen/generateUrl";
import Link, { AnchorProps } from "src/common/ui/Anchor";
import { patternLegacy, UrlPartsLegacy, originLegacy } from "./patternLegacy";
type LinkLegacyProps = Omit<AnchorProps, "href"> & UrlPartsLegacy;
const LinkLegacy: React.FunctionComponent<LinkLegacyProps> = ({ urlQuery, origin, ...props }) => {
  const to = generateUrl(patternLegacy, {}, urlQuery, origin ?? originLegacy);
  return <Link {...props} href={to} />;
};
export default LinkLegacy;
