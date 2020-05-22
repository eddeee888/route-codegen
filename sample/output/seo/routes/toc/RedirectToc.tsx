/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import RedirectServerSide from "route-codegen/RedirectServerSide";
import generateUrl from "route-codegen/generateUrl";
import { UrlPartsToc, patternToc } from "./patternToc";
const RedirectToc: React.FunctionComponent<UrlPartsToc & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternToc, {}, props.urlQuery, props.origin);
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
export default RedirectToc;
