/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import RedirectServerSide from "route-codegen/RedirectServerSide";
import generateUrl from "route-codegen/generateUrl";
import { UrlPartsAccount, patternAccount } from "./patternAccount";
const RedirectAccount: React.FunctionComponent<UrlPartsAccount & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternAccount, {}, props.urlQuery);
  return <RedirectServerSide>{props.fallback}</RedirectServerSide>;
};
export default RedirectAccount;
