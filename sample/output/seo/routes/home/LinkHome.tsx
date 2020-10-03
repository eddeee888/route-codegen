/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import Link, { LinkProps } from "next/link";
import { UrlPartsHome, patternNextJSHome } from "./patternHome";
type LinkHomeProps = Omit<LinkProps, "href"> & UrlPartsHome;
const LinkHome: React.FunctionComponent<LinkHomeProps> = (props) => {
  const { urlQuery = {}, ...rest } = props;
  const path = {};
  const pathname = patternNextJSHome;
  const nextHref = {
    pathname: pathname,
    query: {
      ...path,
      ...urlQuery,
    },
  };
  return <Link {...rest} href={nextHref} />;
};
export default LinkHome;
