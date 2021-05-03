/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import Link, { LinkProps } from "next/link";
import { generateUrl } from "@route-codegen/utils";
import { UrlParamsAbout, patternAbout } from "./patternAbout";
type LinkAboutProps = Omit<LinkProps, "href"> & { urlParams: UrlParamsAbout };
export const LinkAbout: React.FunctionComponent<LinkAboutProps> = ({ urlParams, ...props }) => {
  const href = generateUrl(patternAbout, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin });
  return <Link {...props} href={href} />;
};
