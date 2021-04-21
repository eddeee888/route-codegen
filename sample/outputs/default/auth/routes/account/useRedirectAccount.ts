/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlParamsAccount, patternAccount, originAccount } from "./patternAccount";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnAccount = (urlParams?: UrlParamsAccount) => void;
export const useRedirectAccount = (): RedirectFnAccount => {
  const redirect: RedirectFnAccount = (urlParams) => {
    const to = generateUrl(patternAccount, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originAccount });
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
