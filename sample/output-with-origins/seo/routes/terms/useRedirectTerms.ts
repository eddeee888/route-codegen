/* This file was automatically generated with route-codegen and should not be edited. */
import Router from "next/router";
import { patternTerms, UrlPartsTerms, patternNextJSTerms } from "./patternTerms";
import generateUrl from "route-codegen/generateUrl";
export type RedirectFnTerms = (urlParts?: UrlPartsTerms) => void;
const useRedirectTerms = (): RedirectFnTerms => {
  const redirect: RedirectFnTerms = (urlParts) => {
    const to = generateUrl(patternTerms, {}, urlParts?.urlQuery, urlParts?.origin);
    Router.push(patternNextJSTerms, to);
  };
  return redirect;
};
export default useRedirectTerms;
