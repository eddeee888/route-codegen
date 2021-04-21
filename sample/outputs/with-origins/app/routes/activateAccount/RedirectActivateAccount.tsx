/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlPartsActivateAccount, patternActivateAccount, originActivateAccount } from "./patternActivateAccount";
export const RedirectActivateAccount: React.FunctionComponent<UrlPartsActivateAccount & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl({
    pattern: patternActivateAccount,
    path: props.path,
    query: props.query,
    origin: props.origin ?? originActivateAccount,
  });
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
