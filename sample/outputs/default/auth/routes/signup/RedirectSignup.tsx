/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import { Redirect } from "react-router";
import { UrlParamsSignup, patternSignup } from "./patternSignup";
export const RedirectSignup: React.FunctionComponent<UrlParamsSignup & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternSignup, { path: {}, query: props.query, origin: props.origin });
  return (
    <>
      <Redirect to={to} />
      {props.fallback}
    </>
  );
};
