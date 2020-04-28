/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import generateUrl from "route-codegen/generateUrl";
import { LinkProps, Link } from "react-router-dom";
import { patternUser, UrlPartsUser } from "./patternUser";
type LinkUserProps = Omit<LinkProps, "to"> & UrlPartsUser;
const LinkUser: React.FunctionComponent<LinkUserProps> = ({ path, urlQuery, ...props }) => {
  const to = generateUrl(patternUser, path, urlQuery);
  return <Link {...props} to={to} />;
};
export default LinkUser;
