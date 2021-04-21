/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlPartsAbout, patternAbout, originAbout } from "./patternAbout";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnAbout = (urlParts: UrlPartsAbout) => void;
export const useRedirectAbout = (): RedirectFnAbout => {
  const redirect: RedirectFnAbout = (urlParts) => {
    const to = generateUrl({ pattern: patternAbout, path: urlParts.path, query: urlParts?.query, origin: urlParts?.origin ?? originAbout });
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
