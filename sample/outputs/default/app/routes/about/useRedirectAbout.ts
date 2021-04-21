/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlParamsAbout, patternAbout, originAbout } from "./patternAbout";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnAbout = (urlParams: UrlParamsAbout) => void;
export const useRedirectAbout = (): RedirectFnAbout => {
  const redirect: RedirectFnAbout = (urlParams) => {
    const to = generateUrl(patternAbout, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin ?? originAbout });
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
