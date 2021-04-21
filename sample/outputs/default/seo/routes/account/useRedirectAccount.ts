/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlParamsAccount, patternAccount, originAccount } from "./patternAccount";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnAccount = (urlParts?: UrlParamsAccount) => void;
export const useRedirectAccount = (): RedirectFnAccount => {
  const redirect: RedirectFnAccount = (urlParts) => {
    const to = generateUrl(patternAccount, { path: {}, query: urlParts?.query, origin: urlParts?.origin ?? originAccount });
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
