/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlPartsLegacy, patternLegacy, originLegacy } from "./patternLegacy";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnLegacy = (urlParts?: UrlPartsLegacy) => void;
export const useRedirectLegacy = (): RedirectFnLegacy => {
  const redirect: RedirectFnLegacy = (urlParts) => {
    const to = generateUrl(patternLegacy, { path: {}, query: urlParts?.query, origin: urlParts?.origin ?? originLegacy });
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
