/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternTerms, UrlParamsTerms, originTerms } from "./patternTerms";
export const generateUrlTerms = (urlParams?: UrlParamsTerms): string =>
  generateUrl(patternTerms, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originTerms });
