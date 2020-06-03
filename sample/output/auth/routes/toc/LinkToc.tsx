/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import generateUrl from "route-codegen/generateUrl";
import { AnchorProps, CustomAnchor as Link } from "common/ui/Anchor";
import { patternToc, UrlPartsToc, originToc } from "./patternToc";
type LinkTocProps = Omit<AnchorProps, "href"> & UrlPartsToc;
const LinkToc: React.FunctionComponent<LinkTocProps> = ({ urlQuery, origin, ...props }) => {
  const to = generateUrl(patternToc, {}, urlQuery, origin ?? originToc);
  return <Link {...props} href={to} />;
};
export default LinkToc;
