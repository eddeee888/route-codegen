/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternHome, UrlPartsHome, originHome } from "./patternHome";
export const generateUrlHome = (urlParts?: UrlPartsHome): string =>
  generateUrl(patternHome, { path: {}, query: urlParts?.query, origin: urlParts?.origin ?? originHome });
