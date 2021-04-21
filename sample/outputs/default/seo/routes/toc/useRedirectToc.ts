/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlParamsToc, patternToc, originToc } from "./patternToc";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnToc = (urlParts?: UrlParamsToc) => void;
export const useRedirectToc = (): RedirectFnToc => {
  const redirect: RedirectFnToc = (urlParts) => {
    const to = generateUrl(patternToc, { path: {}, query: urlParts?.query, origin: urlParts?.origin ?? originToc });
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
