/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import generateUrl from "route-codegen/generateUrl";
import Link, { LinkProps } from "next/link";
import { patternTerms, UrlPartsTerms, patternNextJSTerms } from "./patternTerms";
type LinkTermsProps = Omit<LinkProps, "href"> & UrlPartsTerms;
const LinkTerms: React.FunctionComponent<LinkTermsProps> = ({ urlQuery, origin, ...props }) => {
  const to = generateUrl(patternTerms, {}, urlQuery, origin);
  return <Link {...props} href={patternNextJSTerms} as={to} />;
};
export default LinkTerms;
