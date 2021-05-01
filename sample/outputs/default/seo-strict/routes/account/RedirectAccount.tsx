/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlParamsAccount, patternAccount, originAccount } from "./patternAccount";
export const RedirectAccount: React.FunctionComponent<{ fallback?: React.ReactNode; urlParams?: UrlParamsAccount }> = ({
  urlParams,
  ...props
}) => {
  const to = generateUrl(patternAccount, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originAccount });
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
