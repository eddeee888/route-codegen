/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import { AnchorProps, CustomAnchor as Link } from "common/ui/Anchor";
import { patternContact, UrlPartsContact, originContact } from "./patternContact";
type LinkContactProps = Omit<AnchorProps, "href"> & UrlPartsContact;
export const LinkContact: React.FunctionComponent<LinkContactProps> = ({ path, query, origin, ...props }) => {
  const to = generateUrl({ pattern: patternContact, path: path, query, origin: origin ?? originContact });
  return <Link {...props} href={to} />;
};
