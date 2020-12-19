/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import Link, { AnchorProps } from "src/common/ui/Anchor";
import { patternContact, UrlPartsContact, originContact } from "./patternContact";
type LinkContactProps = Omit<AnchorProps, "href"> & UrlPartsContact;
const LinkContact: React.FunctionComponent<LinkContactProps> = ({ path, query, origin, ...props }) => {
  const to = generateUrl(patternContact, path, query, origin ?? originContact);
  return <Link {...props} href={to} />;
};
export default LinkContact;
