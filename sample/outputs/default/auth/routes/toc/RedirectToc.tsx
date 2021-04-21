/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlParamsToc, patternToc, originToc } from "./patternToc";
export const RedirectToc: React.FunctionComponent<UrlParamsToc & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternToc, { path: {}, query: props.query, origin: props.origin ?? originToc });
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
