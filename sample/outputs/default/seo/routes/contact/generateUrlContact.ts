/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternContact, UrlPartsContact, originContact } from "./patternContact";
export const generateUrlContact = (urlParts: UrlPartsContact): string =>
  generateUrl({ pattern: patternContact, path: urlParts.path, query: urlParts?.query, origin: urlParts?.origin ?? originContact });
