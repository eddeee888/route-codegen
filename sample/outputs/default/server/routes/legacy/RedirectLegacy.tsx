/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlPartsLegacy, patternLegacy, originLegacy } from "./patternLegacy";
const RedirectLegacy: React.FunctionComponent<UrlPartsLegacy & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternLegacy, {}, props.query, props.origin ?? originLegacy);
  return <undefined href={to} fallback={props.fallback} />;
};
export default RedirectLegacy;
