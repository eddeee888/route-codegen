/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlPartsAbout, patternAbout } from "./patternAbout";
import generateUrl from "route-codegen/generateUrl";
export type RedirectAbout = (urlParts: UrlPartsAbout) => void;
const useRedirectAbout = (): RedirectAbout => {
  const redirect: RedirectAbout = (urlParts) => {
    const to = generateUrl(patternAbout, urlParts.path, urlParts.urlQuery);
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
export default useRedirectAbout;
