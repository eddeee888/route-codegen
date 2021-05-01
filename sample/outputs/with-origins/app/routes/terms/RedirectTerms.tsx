/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlParamsTerms, patternTerms, originTerms } from "./patternTerms";
export const RedirectTerms: React.FunctionComponent<{ fallback?: React.ReactNode; urlParams?: UrlParamsTerms }> = ({
  urlParams,
  ...props
}) => {
  const to = generateUrl(patternTerms, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originTerms });
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
