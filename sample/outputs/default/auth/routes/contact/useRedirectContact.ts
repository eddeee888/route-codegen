/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlPartsContact, patternContact, originContact } from "./patternContact";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnContact = (urlParts: UrlPartsContact) => void;
export const useRedirectContact = (): RedirectFnContact => {
  const redirect: RedirectFnContact = (urlParts) => {
    const to = generateUrl({
      pattern: patternContact,
      path: urlParts.path,
      query: urlParts?.query,
      origin: urlParts?.origin ?? originContact,
    });
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
