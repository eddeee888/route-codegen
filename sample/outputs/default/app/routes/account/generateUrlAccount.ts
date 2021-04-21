/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternAccount, UrlPartsAccount, originAccount } from "./patternAccount";
export const generateUrlAccount = (urlParts?: UrlPartsAccount): string =>
  generateUrl({ pattern: patternAccount, path: {}, query: urlParts?.query, origin: urlParts?.origin ?? originAccount });
