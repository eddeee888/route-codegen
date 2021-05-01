/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlParamsActivateAccount, patternActivateAccount, originActivateAccount } from "./patternActivateAccount";
export const RedirectActivateAccount: React.FunctionComponent<{ fallback?: React.ReactNode; urlParams: UrlParamsActivateAccount }> = ({
  urlParams,
  ...props
}) => {
  const to = generateUrl(patternActivateAccount, {
    path: urlParams.path,
    query: urlParams?.query,
    origin: urlParams?.origin ?? originActivateAccount,
  });
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
