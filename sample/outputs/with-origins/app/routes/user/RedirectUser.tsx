/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import { Redirect } from "react-router";
import { UrlParamsUser, patternUser } from "./patternUser";
export const RedirectUser: React.FunctionComponent<UrlParamsUser & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternUser, { path: props.path, query: props.query, origin: props.origin });
  return (
    <>
      <Redirect to={to} />
      {props.fallback}
    </>
  );
};
