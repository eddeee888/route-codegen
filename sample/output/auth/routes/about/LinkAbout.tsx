/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import generateUrl from "route-codegen/generateUrl";
import { AnchorProps, CustomAnchor as Link } from "common/ui/Anchor";
import { patternAbout, UrlPartsAbout } from "./patternAbout";
type LinkAboutProps = Omit<AnchorProps, "href"> & UrlPartsAbout;
const LinkAbout: React.FunctionComponent<LinkAboutProps> = ({ path, urlQuery, origin, ...props }) => {
  const to = generateUrl(patternAbout, path, urlQuery, origin);
  return <Link {...props} href={to} />;
};
export default LinkAbout;
