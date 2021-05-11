/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import { Redirect } from "react-router";
import { UrlParamsLogin, patternLogin } from "./patternLogin";
export const RedirectLogin: React.FunctionComponent<{ fallback?: React.ReactNode; urlParams?: UrlParamsLogin }> = ({
  urlParams,
  ...props
}) => {
  const to = generateUrl(patternLogin, { path: {}, query: urlParams?.query, origin: urlParams?.origin });
  return (
    <>
      <Redirect to={to} />
      {props.fallback}
    </>
  );
};
