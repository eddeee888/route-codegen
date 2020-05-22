/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import RedirectServerSide from "route-codegen/RedirectServerSide";
import generateUrl from "route-codegen/generateUrl";
import { UrlPartsUser, patternUser } from "./patternUser";
const RedirectUser: React.FunctionComponent<UrlPartsUser & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternUser, props.path, props.urlQuery, props.origin);
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
export default RedirectUser;
