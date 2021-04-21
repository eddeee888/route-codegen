/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternLegacy, UrlPartsLegacy, originLegacy } from "./patternLegacy";
export const generateUrlLegacy = (urlParts?: UrlPartsLegacy): string =>
  generateUrl({ pattern: patternLegacy, path: {}, query: urlParts?.query, origin: urlParts?.origin ?? originLegacy });
