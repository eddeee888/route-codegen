/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlPartsSignup, patternSignup } from "./patternSignup";
import generateUrl from "route-codegen/generateUrl";
export type RedirectFnSignup = (urlParts?: UrlPartsSignup) => void;
const useRedirectSignup = (): RedirectFnSignup => {
  const redirect: RedirectFnSignup = (urlParts) => {
    const to = generateUrl(patternSignup, {}, urlParts?.urlQuery, urlParts?.origin);
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
export default useRedirectSignup;
