/* This file was automatically generated with route-codegen and should not be edited. */
import Router from "next/router";
import { patternHome, UrlPartsHome, patternNextJSHome } from "./patternHome";
import generateUrl from "route-codegen/generateUrl";
export type RedirectHome = (urlParts: UrlPartsHome) => void;
const useRedirectHome = (): RedirectHome => {
  const redirect: RedirectHome = (urlParts) => {
    const to = generateUrl(patternHome, {}, urlParts.urlQuery);
    Router.push(patternNextJSHome, to);
  };
  return redirect;
};
export default useRedirectHome;
