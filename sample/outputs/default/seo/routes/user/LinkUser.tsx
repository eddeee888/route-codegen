/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";

import { patternUser, UrlPartsUser, originUser } from "./patternUser";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & UrlPartsUser;
export const LinkUser: React.FunctionComponent<LinkProps> = ({ path, query, origin, ...props }) => {
  const to = generateUrl(patternUser, { path: path, query, origin: origin ?? originUser });
  return <a {...props} href={to} />;
};
