/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlParamsLogin, patternLogin, originLogin } from "./patternLogin";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnLogin = (urlParts?: UrlParamsLogin) => void;
export const useRedirectLogin = (): RedirectFnLogin => {
  const redirect: RedirectFnLogin = (urlParts) => {
    const to = generateUrl(patternLogin, { path: {}, query: urlParts?.query, origin: urlParts?.origin ?? originLogin });
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
