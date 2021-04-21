/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlParamsToc, patternToc, originToc } from "./patternToc";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnToc = (urlParams?: UrlParamsToc) => void;
export const useRedirectToc = (): RedirectFnToc => {
  const redirect: RedirectFnToc = (urlParams) => {
    const to = generateUrl(patternToc, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originToc });
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
