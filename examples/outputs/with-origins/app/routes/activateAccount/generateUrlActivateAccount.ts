/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternActivateAccount, UrlParamsActivateAccount, originActivateAccount } from "./patternActivateAccount";
export const generateUrlActivateAccount = (urlParams: UrlParamsActivateAccount): string =>
  generateUrl(patternActivateAccount, {
    path: urlParams.path,
    query: urlParams?.query,
    origin: urlParams?.origin ?? originActivateAccount,
  });
