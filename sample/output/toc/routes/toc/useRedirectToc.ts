/* This file was automatically generated with route-codegen and should not be edited. */
import Router from "next/router";
import { patternToc, UrlPartsToc, patternNextJSToc } from "./patternToc";
import generateUrl from "route-codegen/generateUrl";
export type RedirectFnToc = (urlParts?: UrlPartsToc) => void;
const useRedirectToc = (): RedirectFnToc => {
  const redirect: RedirectFnToc = (urlParts) => {
    const to = generateUrl(patternToc, {}, urlParts?.urlQuery, urlParts?.origin);
    Router.push(patternNextJSToc, to);
  };
  return redirect;
};
export default useRedirectToc;
