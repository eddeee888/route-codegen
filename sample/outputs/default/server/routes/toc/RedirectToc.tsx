/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlPartsToc, patternToc, originToc } from "./patternToc";
const RedirectToc: React.FunctionComponent<UrlPartsToc & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternToc, {}, props.query, props.origin ?? originToc);
  return <undefined href={to} fallback={props.fallback} />;
};
export default RedirectToc;
