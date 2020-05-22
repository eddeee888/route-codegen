/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlPartsLegacy, patternLegacy } from "./patternLegacy";
import generateUrl from "route-codegen/generateUrl";
export type RedirectFnLegacy = (urlParts?: UrlPartsLegacy) => void;
const useRedirectLegacy = (): RedirectFnLegacy => {
  const redirect: RedirectFnLegacy = (urlParts) => {
    const to = generateUrl(patternLegacy, {}, urlParts?.urlQuery, urlParts?.origin);
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
export default useRedirectLegacy;
