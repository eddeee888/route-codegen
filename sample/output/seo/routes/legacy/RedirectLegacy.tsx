/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import RedirectServerSide from "route-codegen/RedirectServerSide";
import generateUrl from "route-codegen/generateUrl";
import { UrlPartsLegacy, patternLegacy, originLegacy } from "./patternLegacy";
const RedirectLegacy: React.FunctionComponent<UrlPartsLegacy & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternLegacy, {}, props.urlQuery, props.origin ?? originLegacy);
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
export default RedirectLegacy;
