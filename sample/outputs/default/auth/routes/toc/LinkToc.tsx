/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import { AnchorProps, CustomAnchor as Link } from "common/ui/Anchor";
import { patternToc, UrlParamsToc, originToc } from "./patternToc";
type LinkTocProps = Omit<AnchorProps, "href"> & { urlParams?: UrlParamsToc };
export const LinkToc: React.FunctionComponent<LinkTocProps> = ({ urlParams, ...props }) => {
  const to = generateUrl(patternToc, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originToc });
  return <Link {...props} href={to} />;
};
