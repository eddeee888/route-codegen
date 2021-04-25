/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import Link, { LinkProps } from "next/link";
import { UrlParamsAbout, patternNextJSAbout, possilePathParamsAbout } from "./patternAbout";
type LinkAboutProps = Omit<LinkProps, "href"> & { urlParams: UrlParamsAbout };
export const LinkAbout: React.FunctionComponent<LinkAboutProps> = ({ urlParams, ...props }) => {
  const { query = {} } = urlParams;
  const path = urlParams.path;
  const pathname = possilePathParamsAbout
    .filter((key) => !(key in path))
    .reduce((prevPattern, suppliedParam) => prevPattern.replace(`/[${suppliedParam}]`, ""), patternNextJSAbout);
  const nextHref = {
    pathname: pathname,
    query: {
      ...path,
      ...query,
    },
  };
  return <Link {...props} href={nextHref} />;
};
