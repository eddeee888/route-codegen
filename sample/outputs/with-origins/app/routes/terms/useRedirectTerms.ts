/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlPartsTerms, patternTerms, originTerms } from "./patternTerms";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnTerms = (urlParts?: UrlPartsTerms) => void;
export const useRedirectTerms = (): RedirectFnTerms => {
  const redirect: RedirectFnTerms = (urlParts) => {
    const to = generateUrl({ pattern: patternTerms, path: {}, query: urlParts?.query, origin: urlParts?.origin ?? originTerms });
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
