/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import Link, { LinkProps } from "next/link";
import { UrlPartsTerms, patternNextJSTerms } from "./patternTerms";
type LinkTermsProps = Omit<LinkProps, "href"> & UrlPartsTerms;
const LinkTerms: React.FunctionComponent<LinkTermsProps> = ({ path = {}, urlQuery = {}, ...props }) => {
  const pathname = patternNextJSTerms;
  const nextHref = {
    pathname: pathname,
    query: {
      ...path,
      ...urlQuery,
    },
  };
  return <Link {...props} href={nextHref} />;
};
export default LinkTerms;
