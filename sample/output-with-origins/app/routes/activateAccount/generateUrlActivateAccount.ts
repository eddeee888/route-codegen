/* This file was automatically generated with route-codegen and should not be edited. */
import generateUrl from "route-codegen/generateUrl";
import { patternActivateAccount, UrlPartsActivateAccount, originActivateAccount } from "./patternActivateAccount";
const generateUrlActivateAccount = (urlParts: UrlPartsActivateAccount): string =>
  generateUrl(patternActivateAccount, urlParts.path, urlParts?.urlQuery, urlParts?.origin ?? originActivateAccount);
export default generateUrlActivateAccount;
