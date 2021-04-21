/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import Link, { AnchorProps } from "src/common/ui/Anchor";
import { patternAbout, UrlPartsAbout, originAbout } from "./patternAbout";
type LinkAboutProps = Omit<AnchorProps, "href"> & UrlPartsAbout;
export const LinkAbout: React.FunctionComponent<LinkAboutProps> = ({ path, query, origin, ...props }) => {
  const to = generateUrl(patternAbout, { path: path, query, origin: origin ?? originAbout });
  return <Link {...props} href={to} />;
};
