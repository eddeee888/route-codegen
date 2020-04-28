/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import generateUrl from "route-codegen/generateUrl";
import Link, { AnchorProps } from "src/common/ui/Anchor";
import { patternLegacy, UrlPartsLegacy } from "./patternLegacy";
type LinkLegacyProps = Omit<AnchorProps, "href"> & UrlPartsLegacy;
const LinkLegacy: React.FunctionComponent<LinkLegacyProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternLegacy, {}, urlQuery);
  return <Link {...props} href={to} />;
};
export default LinkLegacy;
