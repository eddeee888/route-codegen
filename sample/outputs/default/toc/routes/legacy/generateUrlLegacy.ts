/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternLegacy, UrlParamsLegacy, originLegacy } from "./patternLegacy";
export const generateUrlLegacy = (urlParams?: UrlParamsLegacy): string =>
  generateUrl(patternLegacy, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originLegacy });
