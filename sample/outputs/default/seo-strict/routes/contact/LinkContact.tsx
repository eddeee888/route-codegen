/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import Link, { LinkProps } from "next/link";
import { UrlPartsContact, patternNextJSContact, possilePathParamsContact } from "./patternContact";
type LinkContactProps = Omit<LinkProps, "href"> & UrlPartsContact;
export const LinkContact: React.FunctionComponent<LinkContactProps> = (props) => {
  const { path = {}, query = {}, ...rest } = props;
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
  return <Link {...rest} href={nextHref} />;
};
