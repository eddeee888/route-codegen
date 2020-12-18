/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlPartsUser, patternUser, originUser } from "./patternUser";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnUser = (urlParts: UrlPartsUser) => void;
const useRedirectUser = (): RedirectFnUser => {
  const redirect: RedirectFnUser = (urlParts) => {
    const to = generateUrl(patternUser, urlParts.path, urlParts?.query, urlParts?.origin ?? originUser);
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
export default useRedirectUser;
