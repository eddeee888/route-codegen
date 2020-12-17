/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import generateUrl from "route-codegen/generateUrl";
import Link, { AnchorProps } from "src/common/ui/Anchor";
import { patternUser, UrlPartsUser, originUser } from "./patternUser";
type LinkUserProps = Omit<AnchorProps, "href"> & UrlPartsUser;
const LinkUser: React.FunctionComponent<LinkUserProps> = ({ path, query, origin, ...props }) => {
  const to = generateUrl(patternUser, path, query, origin ?? originUser);
  return <Link {...props} href={to} />;
};
export default LinkUser;
