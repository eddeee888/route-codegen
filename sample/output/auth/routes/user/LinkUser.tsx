/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import generateUrl from "route-codegen/generateUrl";
import { AnchorProps, CustomAnchor as Link } from "common/ui/Anchor";
import { patternUser, UrlPartsUser, originUser } from "./patternUser";
type LinkUserProps = Omit<AnchorProps, "href"> & UrlPartsUser;
const LinkUser: React.FunctionComponent<LinkUserProps> = ({ path, urlQuery, origin, ...props }) => {
  const to = generateUrl(patternUser, path, urlQuery, origin ?? originUser);
  return <Link {...props} href={to} />;
};
export default LinkUser;
