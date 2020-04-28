/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "route-codegen";
import Link, { AnchorProps } from "src/common/ui/Anchor";
import { patternUser, UrlPartsUser } from "./patternUser";
type LinkUserProps = Omit<AnchorProps, "href"> & UrlPartsUser;
const LinkUser: React.FunctionComponent<LinkUserProps> = ({ path, urlQuery, ...props }) => {
  const to = generateUrl(patternUser, path, urlQuery);
  return <Link {...props} href={to} />;
};
export default LinkUser;
