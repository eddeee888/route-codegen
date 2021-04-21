/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlParamsHome, patternHome, originHome } from "./patternHome";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnHome = (urlParts?: UrlParamsHome) => void;
export const useRedirectHome = (): RedirectFnHome => {
  const redirect: RedirectFnHome = (urlParts) => {
    const to = generateUrl(patternHome, { path: {}, query: urlParts?.query, origin: urlParts?.origin ?? originHome });
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
