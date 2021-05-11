/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlParamsTerms, patternTerms, originTerms } from "./patternTerms";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnTerms = (urlParams?: UrlParamsTerms) => void;
export const useRedirectTerms = (): RedirectFnTerms => {
  const redirect: RedirectFnTerms = (urlParams) => {
    const to = generateUrl(patternTerms, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originTerms });
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
