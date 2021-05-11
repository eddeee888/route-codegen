/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlParamsContact, patternContact, originContact } from "./patternContact";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnContact = (urlParams: UrlParamsContact) => void;
export const useRedirectContact = (): RedirectFnContact => {
  const redirect: RedirectFnContact = (urlParams) => {
    const to = generateUrl(patternContact, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin ?? originContact });
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
