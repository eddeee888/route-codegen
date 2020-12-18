/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { RedirectServerSide } from "@route-codegen/react";
import { generateUrl } from "@route-codegen/utils";
import { UrlPartsContact, patternContact, originContact } from "./patternContact";
const RedirectContact: React.FunctionComponent<UrlPartsContact & { fallback?: React.ReactNode }> = (props) => {
  const to = generateUrl(patternContact, props.path, props.query, props.origin ?? originContact);
  return <RedirectServerSide href={to} fallback={props.fallback} />;
};
export default RedirectContact;
