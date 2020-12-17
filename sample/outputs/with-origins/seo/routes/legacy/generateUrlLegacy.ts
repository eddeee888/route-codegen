/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternLegacy, UrlPartsLegacy, originLegacy } from "./patternLegacy";
const generateUrlLegacy = (urlParts?: UrlPartsLegacy): string =>
  generateUrl(patternLegacy, {}, urlParts?.query, urlParts?.origin ?? originLegacy);
export default generateUrlLegacy;
