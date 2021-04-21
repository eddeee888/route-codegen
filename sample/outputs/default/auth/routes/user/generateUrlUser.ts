/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternUser, UrlPartsUser, originUser } from "./patternUser";
export const generateUrlUser = (urlParts: UrlPartsUser): string =>
  generateUrl(patternUser, { path: urlParts.path, query: urlParts?.query, origin: urlParts?.origin ?? originUser });
