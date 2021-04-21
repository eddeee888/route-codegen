/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlParamsUser, patternUser, originUser } from "./patternUser";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnUser = (urlParts: UrlParamsUser) => void;
export const useRedirectUser = (): RedirectFnUser => {
  const redirect: RedirectFnUser = (urlParts) => {
    const to = generateUrl(patternUser, { path: urlParts.path, query: urlParts?.query, origin: urlParts?.origin ?? originUser });
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
