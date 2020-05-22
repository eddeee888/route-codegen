/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import generateUrl from "route-codegen/generateUrl";
import Link, { LinkProps } from "next/link";
import { patternHome, UrlPartsHome, patternNextJSHome } from "./patternHome";
type LinkHomeProps = Omit<LinkProps, "href"> & UrlPartsHome;
const LinkHome: React.FunctionComponent<LinkHomeProps> = ({ urlQuery, origin, ...props }) => {
  const to = generateUrl(patternHome, {}, urlQuery, origin);
  return <Link {...props} href={patternNextJSHome} as={to} />;
};
export default LinkHome;
