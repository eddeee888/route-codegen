/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import RedirectServerSide from "route-codegen/RedirectServerSide";
import { generateUrl } from "route-codegen";
import { UrlPartsLegacy, patternLegacy } from "./patternLegacy";
const RedirectLegacy: React.FunctionComponent<UrlPartsLegacy & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternLegacy, {}, props.urlQuery);
  return <RedirectServerSide>{props.fallback}</RedirectServerSide>;
};
export default RedirectLegacy;
