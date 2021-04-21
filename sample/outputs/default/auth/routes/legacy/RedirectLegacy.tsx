/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlParamsLegacy, patternLegacy, originLegacy } from "./patternLegacy";
export const RedirectLegacy: React.FunctionComponent<UrlParamsLegacy & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternLegacy, { path: {}, query: props.query, origin: props.origin ?? originLegacy });
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
