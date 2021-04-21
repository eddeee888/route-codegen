/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlPartsAccount, patternAccount, originAccount } from "./patternAccount";
export const RedirectAccount: React.FunctionComponent<UrlPartsAccount & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl({ pattern: patternAccount, path: {}, query: props.query, origin: props.origin ?? originAccount });
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
