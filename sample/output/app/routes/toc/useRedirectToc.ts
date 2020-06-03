/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlPartsToc, patternToc, originToc } from "./patternToc";
import generateUrl from "route-codegen/generateUrl";
export type RedirectFnToc = (urlParts?: UrlPartsToc) => void;
const useRedirectToc = (): RedirectFnToc => {
  const redirect: RedirectFnToc = (urlParts) => {
    const to = generateUrl(patternToc, {}, urlParts?.urlQuery, urlParts?.origin ?? originToc);
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
export default useRedirectToc;
