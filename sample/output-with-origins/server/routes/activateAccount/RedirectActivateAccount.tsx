/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import RedirectServerSide from "route-codegen/RedirectServerSide";
import generateUrl from "route-codegen/generateUrl";
import { UrlPartsActivateAccount, patternActivateAccount, originActivateAccount } from "./patternActivateAccount";
const RedirectActivateAccount: React.FunctionComponent<UrlPartsActivateAccount & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternActivateAccount, props.path, props.query, props.origin ?? originActivateAccount);
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
export default RedirectActivateAccount;
