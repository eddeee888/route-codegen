/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import { AnchorProps, CustomAnchor as Link } from "common/ui/Anchor";
import { patternUser, UrlPartsUser, originUser } from "./patternUser";
type LinkUserProps = Omit<AnchorProps, "href"> & UrlPartsUser;
export const LinkUser: React.FunctionComponent<LinkUserProps> = ({ path, query, origin, ...props }) => {
  const to = generateUrl({ pattern: patternUser, path: path, query, origin: origin ?? originUser });
  return <Link {...props} href={to} />;
};
