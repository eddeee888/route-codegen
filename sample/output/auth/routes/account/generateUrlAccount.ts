/* This file was automatically generated with route-codegen and should not be edited. */
import generateUrl from "route-codegen/generateUrl";
import { patternAccount, UrlPartsAccount, originAccount } from "./patternAccount";
const generateUrlAccount = (urlParts?: UrlPartsAccount): string =>
  generateUrl(patternAccount, {}, urlParts?.urlQuery, urlParts?.origin ?? originAccount);
export default generateUrlAccount;
