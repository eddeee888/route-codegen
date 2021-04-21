/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlPartsToc, patternToc, originToc } from "./patternToc";
export const RedirectToc: React.FunctionComponent<UrlPartsToc & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl({ pattern: patternToc, path: {}, query: props.query, origin: props.origin ?? originToc });
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
