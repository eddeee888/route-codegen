/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlPartsSignup, patternSignup, originSignup } from "./patternSignup";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnSignup = (urlParts?: UrlPartsSignup) => void;
export const useRedirectSignup = (): RedirectFnSignup => {
  const redirect: RedirectFnSignup = (urlParts) => {
    const to = generateUrl(patternSignup, { path: {}, query: urlParts?.query, origin: urlParts?.origin ?? originSignup });
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
