/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternGraphql, UrlPartsGraphql, originGraphql } from "./patternGraphql";
export const generateUrlGraphql = (urlParts?: UrlPartsGraphql): string =>
  generateUrl({ pattern: patternGraphql, path: {}, query: urlParts?.query, origin: urlParts?.origin ?? originGraphql });
