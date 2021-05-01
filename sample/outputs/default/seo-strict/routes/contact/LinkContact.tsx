/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import Link, { LinkProps } from "next/link";
import { UrlParamsContact, patternNextJSContact, possilePathParamsContact } from "./patternContact";
type LinkContactProps = Omit<LinkProps, "href"> & { urlParams: UrlParamsContact };
export const LinkContact: React.FunctionComponent<LinkContactProps> = ({ urlParams, ...props }) => {
  const query = urlParams?.query || {};
  const path = urlParams.path;
  const pathname = possilePathParamsContact
    .filter((key) => !(key in path))
    .reduce((prevPattern, suppliedParam) => prevPattern.replace(`/[${suppliedParam}]`, ""), patternNextJSContact);
  const nextHref = {
    pathname: pathname,
    query: {
      ...path,
      ...query,
    },
  };
  return <Link {...props} href={nextHref} />;
};
