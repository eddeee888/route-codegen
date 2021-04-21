/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlPartsActivateAccount, patternActivateAccount, originActivateAccount } from "./patternActivateAccount";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnActivateAccount = (urlParts: UrlPartsActivateAccount) => void;
export const useRedirectActivateAccount = (): RedirectFnActivateAccount => {
  const redirect: RedirectFnActivateAccount = (urlParts) => {
    const to = generateUrl({
      pattern: patternActivateAccount,
      path: urlParts.path,
      query: urlParts?.query,
      origin: urlParts?.origin ?? originActivateAccount,
    });
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
