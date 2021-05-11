/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlParamsLegacy, patternLegacy, originLegacy } from "./patternLegacy";
export const RedirectLegacy: React.FunctionComponent<{ fallback?: React.ReactNode; urlParams?: UrlParamsLegacy }> = ({
  urlParams,
  ...props
}) => {
  const to = generateUrl(patternLegacy, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originLegacy });
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
