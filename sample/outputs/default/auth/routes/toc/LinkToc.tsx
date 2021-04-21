/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import { AnchorProps, CustomAnchor as Link } from "common/ui/Anchor";
import { patternToc, UrlPartsToc, originToc } from "./patternToc";
type LinkTocProps = Omit<AnchorProps, "href"> & UrlPartsToc;
export const LinkToc: React.FunctionComponent<LinkTocProps> = ({ query, origin, ...props }) => {
  const to = generateUrl({ pattern: patternToc, path: {}, query, origin: origin ?? originToc });
  return <Link {...props} href={to} />;
};
