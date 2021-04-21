/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlPartsLogin, patternLogin, originLogin } from "./patternLogin";
export const RedirectLogin: React.FunctionComponent<UrlPartsLogin & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl({ pattern: patternLogin, path: {}, query: props.query, origin: props.origin ?? originLogin });
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
