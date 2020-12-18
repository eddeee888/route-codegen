/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlPartsUser, patternUser, originUser } from "./patternUser";
const RedirectUser: React.FunctionComponent<UrlPartsUser & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternUser, props.path, props.query, props.origin ?? originUser);
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
export default RedirectUser;
