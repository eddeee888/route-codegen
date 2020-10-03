/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlPartsAbout, patternAbout, originAbout } from "./patternAbout";
import generateUrl from "route-codegen/generateUrl";
export type RedirectFnAbout = (urlParts: UrlPartsAbout) => void;
const useRedirectAbout = (): RedirectFnAbout => {
  const redirect: RedirectFnAbout = (urlParts) => {
    const to = generateUrl(patternAbout, urlParts.path, urlParts?.query, urlParts?.origin ?? originAbout);
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
export default useRedirectAbout;
