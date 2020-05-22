/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import generateUrl from "route-codegen/generateUrl";

import { patternAccount, UrlPartsAccount } from "./patternAccount";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> & UrlPartsAccount;
const LinkAccount: React.FunctionComponent<LinkProps> = ({ urlQuery, origin, ...props }) => {
  const to = generateUrl(patternAccount, {}, urlQuery, origin);
  return <a {...props} href={to} />;
};
export default LinkAccount;
