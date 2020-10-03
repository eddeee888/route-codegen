/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import Link, { LinkProps } from "next/link";
import { UrlPartsTerms, patternNextJSTerms } from "./patternTerms";
type LinkTermsProps = Omit<LinkProps, "href"> & UrlPartsTerms;
const LinkTerms: React.FunctionComponent<LinkTermsProps> = (props) => {
  const { urlQuery = {}, ...rest } = props;
  const path = {};
  const pathname = patternNextJSTerms;
  const nextHref = {
    pathname: pathname,
    query: {
      ...path,
      ...urlQuery,
    },
  };
  return <Link {...rest} href={nextHref} />;
};
export default LinkTerms;
