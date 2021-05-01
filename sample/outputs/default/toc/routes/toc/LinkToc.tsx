/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import Link, { NextLinkProps } from "~/common/components/NextLink";
import { UrlParamsToc, patternNextJSToc } from "./patternToc";
type LinkTocProps = Omit<NextLinkProps, "href"> & { urlParams?: UrlParamsToc };
export const LinkToc: React.FunctionComponent<LinkTocProps> = ({ urlParams, ...props }) => {
  const { query = {} } = urlParams;
  const path = {};
  const pathname = patternNextJSToc;
  const nextHref = {
    pathname: pathname,
    query: {
      ...path,
      ...query,
    },
  };
  return <Link {...props} href={nextHref} />;
};
