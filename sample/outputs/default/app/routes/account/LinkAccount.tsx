/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import { LinkProps, Link } from "react-router-dom";
import { patternAccount, UrlPartsAccount } from "./patternAccount";
type LinkAccountProps = Omit<LinkProps, "to"> & UrlPartsAccount;
const LinkAccount: React.FunctionComponent<LinkAccountProps> = ({ query, origin, ...props }) => {
  const to = generateUrl(patternAccount, {}, query, origin);
  return <Link {...props} to={to} />;
};
export default LinkAccount;
