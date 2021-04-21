/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlParamsLegacy, patternLegacy, originLegacy } from "./patternLegacy";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnLegacy = (urlParams?: UrlParamsLegacy) => void;
export const useRedirectLegacy = (): RedirectFnLegacy => {
  const redirect: RedirectFnLegacy = (urlParams) => {
    const to = generateUrl(patternLegacy, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originLegacy });
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
