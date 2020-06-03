/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import RedirectServerSide from "route-codegen/RedirectServerSide";
import generateUrl from "route-codegen/generateUrl";
import { UrlPartsTerms, patternTerms, originTerms } from "./patternTerms";
const RedirectTerms: React.FunctionComponent<UrlPartsTerms & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternTerms, {}, props.urlQuery, props.origin ?? originTerms);
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
export default RedirectTerms;
