/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import { Redirect } from "react-router";
import { UrlPartsLogin, patternLogin } from "./patternLogin";
export const RedirectLogin: React.FunctionComponent<UrlPartsLogin & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternLogin, { path: {}, query: props.query, origin: props.origin });
  return (
    <>
      <Redirect to={to} />
      {props.fallback}
    </>
  );
};
