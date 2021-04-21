/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternLogin, UrlPartsLogin, originLogin } from "./patternLogin";
export const generateUrlLogin = (urlParts?: UrlPartsLogin): string =>
  generateUrl(patternLogin, { path: {}, query: urlParts?.query, origin: urlParts?.origin ?? originLogin });
