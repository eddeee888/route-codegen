/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "route-codegen";
import { AnchorProps, CustomAnchor as Link } from "common/ui/Anchor";
import { patternHome, UrlPartsHome } from "./patternHome";
type LinkHomeProps = Omit<AnchorProps, "href"> & UrlPartsHome;
const LinkHome: React.FunctionComponent<LinkHomeProps> = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternHome, {}, urlQuery);
  return <Link {...props} href={to} />;
};
export default LinkHome;
