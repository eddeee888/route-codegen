/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import Link, { AnchorProps } from "src/common/ui/Anchor";
import { patternUser, UrlParamsUser, originUser } from "./patternUser";
type LinkUserProps = Omit<AnchorProps, "href"> & { urlParams: UrlParamsUser };
export const LinkUser: React.FunctionComponent<LinkUserProps> = ({ urlParams, ...props }) => {
  const to = generateUrl(patternUser, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin ?? originUser });
  return <Link {...props} href={to} />;
};
