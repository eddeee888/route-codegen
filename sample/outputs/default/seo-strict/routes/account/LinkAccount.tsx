/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";

import { patternAccount, UrlPartsAccount, originAccount } from "./patternAccount";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & UrlPartsAccount;
const LinkAccount: React.FunctionComponent<LinkProps> = ({ query, origin, ...props }) => {
  const to = generateUrl(patternAccount, {}, query, origin ?? originAccount);
  return <a {...props} href={to} />;
};
export default LinkAccount;
