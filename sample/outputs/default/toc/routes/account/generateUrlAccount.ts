/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternAccount, UrlParamsAccount, originAccount } from "./patternAccount";
export const generateUrlAccount = (urlParams?: UrlParamsAccount): string =>
  generateUrl(patternAccount, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originAccount });
