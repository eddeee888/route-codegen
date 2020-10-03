/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlPartsActivateAccount, patternActivateAccount, originActivateAccount } from "./patternActivateAccount";
import generateUrl from "route-codegen/generateUrl";
export type RedirectFnActivateAccount = (urlParts: UrlPartsActivateAccount) => void;
const useRedirectActivateAccount = (): RedirectFnActivateAccount => {
  const redirect: RedirectFnActivateAccount = (urlParts) => {
    const to = generateUrl(patternActivateAccount, urlParts.path, urlParts?.query, urlParts?.origin ?? originActivateAccount);
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
export default useRedirectActivateAccount;
