/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternContact, UrlParamsContact, originContact } from "./patternContact";
export const generateUrlContact = (urlParams: UrlParamsContact): string =>
  generateUrl(patternContact, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin ?? originContact });
