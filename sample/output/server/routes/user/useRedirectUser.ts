/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlPartsUser, patternUser } from "./patternUser";
import { generateUrl } from "route-codegen";
export type RedirectUser = (urlParts: UrlPartsUser) => void;
const useRedirectUser = (): RedirectUser => {
  const redirect: RedirectUser = (urlParts) => {
    const to = generateUrl(patternUser, urlParts.path, urlParts.urlQuery);
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
export default useRedirectUser;
