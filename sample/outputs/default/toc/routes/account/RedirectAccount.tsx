/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlPartsAccount, patternAccount, originAccount } from "./patternAccount";
const RedirectAccount: React.FunctionComponent<UrlPartsAccount & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternAccount, {}, props.query, props.origin ?? originAccount);
  return <undefined href={to} fallback={props.fallback} />;
};
export default RedirectAccount;
