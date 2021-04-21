/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternUser, UrlParamsUser, originUser } from "./patternUser";
export const generateUrlUser = (urlParams: UrlParamsUser): string =>
  generateUrl(patternUser, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin ?? originUser });
