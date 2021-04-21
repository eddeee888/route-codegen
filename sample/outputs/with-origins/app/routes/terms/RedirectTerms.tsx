/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlPartsTerms, patternTerms, originTerms } from "./patternTerms";
export const RedirectTerms: React.FunctionComponent<UrlPartsTerms & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternTerms, { path: {}, query: props.query, origin: props.origin ?? originTerms });
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
