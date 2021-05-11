/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import Link, { AnchorProps } from "~/common/components/Anchor";
import { patternAbout, UrlParamsAbout, originAbout } from "./patternAbout";
type LinkAboutProps = Omit<AnchorProps, "href"> & { urlParams: UrlParamsAbout };
export const LinkAbout: React.FunctionComponent<LinkAboutProps> = ({ urlParams, ...props }) => {
  const to = generateUrl(patternAbout, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin ?? originAbout });
  return <Link {...props} href={to} />;
};
