/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlParamsContact, patternContact, originContact } from "./patternContact";
export const RedirectContact: React.FunctionComponent<{ fallback?: React.ReactNode; urlParams: UrlParamsContact }> = ({
  urlParams,
  ...props
}) => {
  const to = generateUrl(patternContact, { path: urlParams.path, query: urlParams.query, origin: urlParams.origin ?? originContact });
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
