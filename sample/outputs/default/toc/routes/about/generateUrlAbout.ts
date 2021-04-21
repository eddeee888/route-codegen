/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternAbout, UrlPartsAbout, originAbout } from "./patternAbout";
export const generateUrlAbout = (urlParts: UrlPartsAbout): string =>
  generateUrl(patternAbout, { path: urlParts.path, query: urlParts?.query, origin: urlParts?.origin ?? originAbout });
