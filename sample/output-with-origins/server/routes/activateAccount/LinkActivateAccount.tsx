/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import generateUrl from "route-codegen/generateUrl";

import { patternActivateAccount, UrlPartsActivateAccount, originActivateAccount } from "./patternActivateAccount";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> &
  UrlPartsActivateAccount;
const LinkActivateAccount: React.FunctionComponent<LinkProps> = ({ path, urlQuery, origin, ...props }) => {
  const to = generateUrl(patternActivateAccount, path, urlQuery, origin ?? originActivateAccount);
  return <a {...props} href={to} />;
};
export default LinkActivateAccount;
