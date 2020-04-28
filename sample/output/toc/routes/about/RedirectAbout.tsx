/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import RedirectServerSide from "route-codegen/RedirectServerSide";
import { generateUrl } from "route-codegen";
import { UrlPartsAbout, patternAbout } from "./patternAbout";
const RedirectAbout: React.FunctionComponent<UrlPartsAbout & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternAbout, props.path, props.urlQuery);
  return <RedirectServerSide>{props.fallback}</RedirectServerSide>;
};
export default RedirectAbout;
