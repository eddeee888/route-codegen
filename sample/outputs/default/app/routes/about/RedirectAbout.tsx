/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlPartsAbout, patternAbout, originAbout } from "./patternAbout";
const RedirectAbout: React.FunctionComponent<UrlPartsAbout & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternAbout, props.path, props.query, props.origin ?? originAbout);
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
export default RedirectAbout;
