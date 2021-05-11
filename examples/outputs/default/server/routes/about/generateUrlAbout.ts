/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternAbout, UrlParamsAbout, originAbout } from "./patternAbout";
export const generateUrlAbout = (urlParams: UrlParamsAbout): string =>
  generateUrl(patternAbout, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin ?? originAbout });
