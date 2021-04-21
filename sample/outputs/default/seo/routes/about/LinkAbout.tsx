/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import Link, { LinkProps } from "next/link";
import { UrlPartsAbout, patternNextJSAbout, possilePathParamsAbout } from "./patternAbout";
type LinkAboutProps = Omit<LinkProps, "href"> & UrlPartsAbout;
export const LinkAbout: React.FunctionComponent<LinkAboutProps> = (props) => {
  const { path = {}, query = {}, ...rest } = props;
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
  return <Link {...rest} href={nextHref} />;
};
