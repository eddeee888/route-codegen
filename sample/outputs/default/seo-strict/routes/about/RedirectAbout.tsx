/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlParamsAbout, patternAbout, originAbout } from "./patternAbout";
export const RedirectAbout: React.FunctionComponent<{ fallback?: React.ReactNode; urlParams: UrlParamsAbout }> = ({
  urlParams,
  ...props
}) => {
  const to = generateUrl(patternAbout, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin ?? originAbout });
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
