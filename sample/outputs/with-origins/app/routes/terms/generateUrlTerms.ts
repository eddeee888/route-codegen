/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternTerms, UrlPartsTerms, originTerms } from "./patternTerms";
const generateUrlTerms = (urlParts?: UrlPartsTerms): string =>
  generateUrl(patternTerms, {}, urlParts?.query, urlParts?.origin ?? originTerms);
export default generateUrlTerms;
