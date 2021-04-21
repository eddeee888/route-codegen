/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import Link, { AnchorProps } from "src/common/ui/Anchor";
import { patternHome, UrlPartsHome, originHome } from "./patternHome";
type LinkHomeProps = Omit<AnchorProps, "href"> & UrlPartsHome;
export const LinkHome: React.FunctionComponent<LinkHomeProps> = ({ query, origin, ...props }) => {
  const to = generateUrl({ pattern: patternHome, path: {}, query, origin: origin ?? originHome });
  return <Link {...props} href={to} />;
};
