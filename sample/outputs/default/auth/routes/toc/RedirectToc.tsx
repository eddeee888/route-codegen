/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlParamsToc, patternToc, originToc } from "./patternToc";
export const RedirectToc: React.FunctionComponent<{ fallback?: React.ReactNode; urlParams?: UrlParamsToc }> = ({ urlParams, ...props }) => {
  const to = generateUrl(patternToc, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originToc });
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
