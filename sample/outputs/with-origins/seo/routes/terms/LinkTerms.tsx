/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import Link, { LinkProps } from "next/link";
import { UrlParamsTerms, patternNextJSTerms } from "./patternTerms";
type LinkTermsProps = Omit<LinkProps, "href"> & { urlParams?: UrlParamsTerms };
export const LinkTerms: React.FunctionComponent<LinkTermsProps> = ({ urlParams, ...props }) => {
  const { query = {} } = urlParams;
  const path = {};
  const pathname = patternNextJSTerms;
  const nextHref = {
    pathname: pathname,
    query: {
      ...path,
      ...query,
    },
  };
  return <Link {...props} href={nextHref} />;
};
