/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import Link, { NextLinkProps } from "~/common/components/NextLink";
import { generateUrl } from "@route-codegen/utils";
import { UrlParamsToc, patternToc } from "./patternToc";
type LinkTocProps = Omit<NextLinkProps, "href"> & { urlParams?: UrlParamsToc };
export const LinkToc: React.FunctionComponent<LinkTocProps> = ({ urlParams, ...props }) => {
  const href = generateUrl(patternToc, { path: {}, query: urlParams?.query, origin: urlParams?.origin });
  return <Link {...props} href={href} />;
};
