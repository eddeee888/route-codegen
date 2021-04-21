/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternTerms, UrlPartsTerms, originTerms } from "./patternTerms";
export const generateUrlTerms = (urlParts?: UrlPartsTerms): string =>
  generateUrl({ pattern: patternTerms, path: {}, query: urlParts?.query, origin: urlParts?.origin ?? originTerms });
