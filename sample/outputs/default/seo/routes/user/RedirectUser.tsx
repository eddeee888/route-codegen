/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlParamsUser, patternUser, originUser } from "./patternUser";
export const RedirectUser: React.FunctionComponent<{ fallback?: React.ReactNode; urlParams: UrlParamsUser }> = ({
  urlParams,
  ...props
}) => {
  const to = generateUrl(patternUser, { path: urlParams.path, query: urlParams.query, origin: urlParams.origin ?? originUser });
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
