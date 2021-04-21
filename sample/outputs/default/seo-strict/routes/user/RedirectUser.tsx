/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlPartsUser, patternUser, originUser } from "./patternUser";
export const RedirectUser: React.FunctionComponent<UrlPartsUser & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl({ pattern: patternUser, path: props.path, query: props.query, origin: props.origin ?? originUser });
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
