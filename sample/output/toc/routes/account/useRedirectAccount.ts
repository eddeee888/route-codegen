/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlPartsAccount, patternAccount } from "./patternAccount";
import { generateUrl } from "route-codegen";
export type RedirectAccount = (urlParts: UrlPartsAccount) => void;
const useRedirectAccount = (): RedirectAccount => {
  const redirect: RedirectAccount = (urlParts) => {
    const to = generateUrl(patternAccount, {}, urlParts.urlQuery);
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
export default useRedirectAccount;
