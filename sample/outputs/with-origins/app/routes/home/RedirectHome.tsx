/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlParamsHome, patternHome, originHome } from "./patternHome";
export const RedirectHome: React.FunctionComponent<UrlParamsHome & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternHome, { path: {}, query: props.query, origin: props.origin ?? originHome });
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
