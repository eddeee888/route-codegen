/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import RedirectServerSide from "route-codegen/RedirectServerSide";
import generateUrl from "route-codegen/generateUrl";
import { UrlPartsAbout, patternAbout, originAbout } from "./patternAbout";
const RedirectAbout: React.FunctionComponent<UrlPartsAbout & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternAbout, props.path, props.urlQuery, props.origin ?? originAbout);
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
export default RedirectAbout;
