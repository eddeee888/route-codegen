/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import { Redirect } from "react-router";
import { UrlParamsAccount, patternAccount } from "./patternAccount";
export const RedirectAccount: React.FunctionComponent<UrlParamsAccount & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternAccount, { path: {}, query: props.query, origin: props.origin });
  return (
    <>
      <Redirect to={to} />
      {props.fallback}
    </>
  );
};
