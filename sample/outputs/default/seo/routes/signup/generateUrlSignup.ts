/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternSignup, UrlPartsSignup, originSignup } from "./patternSignup";
export const generateUrlSignup = (urlParts?: UrlPartsSignup): string =>
  generateUrl({ pattern: patternSignup, path: {}, query: urlParts?.query, origin: urlParts?.origin ?? originSignup });
