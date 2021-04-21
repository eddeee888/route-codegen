/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternActivateAccount, UrlPartsActivateAccount, originActivateAccount } from "./patternActivateAccount";
export const generateUrlActivateAccount = (urlParts: UrlPartsActivateAccount): string =>
  generateUrl(patternActivateAccount, { path: urlParts.path, query: urlParts?.query, origin: urlParts?.origin ?? originActivateAccount });
