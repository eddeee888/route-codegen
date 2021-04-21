/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlParamsAbout, patternAbout, originAbout } from "./patternAbout";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnAbout = (urlParts: UrlParamsAbout) => void;
export const useRedirectAbout = (): RedirectFnAbout => {
  const redirect: RedirectFnAbout = (urlParts) => {
    const to = generateUrl(patternAbout, { path: urlParts.path, query: urlParts?.query, origin: urlParts?.origin ?? originAbout });
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
