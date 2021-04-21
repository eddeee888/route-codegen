/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";

import { patternActivateAccount, UrlPartsActivateAccount, originActivateAccount } from "./patternActivateAccount";
type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href"> &
  UrlPartsActivateAccount;
export const LinkActivateAccount: React.FunctionComponent<LinkProps> = ({ path, query, origin, ...props }) => {
  const to = generateUrl({ pattern: patternActivateAccount, path: path, query, origin: origin ?? originActivateAccount });
  return <a {...props} href={to} />;
};
