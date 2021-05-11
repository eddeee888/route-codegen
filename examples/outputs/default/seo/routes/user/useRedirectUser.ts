/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlParamsUser, patternUser, originUser } from "./patternUser";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnUser = (urlParams: UrlParamsUser) => void;
export const useRedirectUser = (): RedirectFnUser => {
  const redirect: RedirectFnUser = (urlParams) => {
    const to = generateUrl(patternUser, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin ?? originUser });
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
