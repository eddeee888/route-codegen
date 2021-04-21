/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlParamsActivateAccount, patternActivateAccount, originActivateAccount } from "./patternActivateAccount";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnActivateAccount = (urlParams: UrlParamsActivateAccount) => void;
export const useRedirectActivateAccount = (): RedirectFnActivateAccount => {
  const redirect: RedirectFnActivateAccount = (urlParams) => {
    const to = generateUrl(patternActivateAccount, {
      path: urlParams.path,
      query: urlParams?.query,
      origin: urlParams?.origin ?? originActivateAccount,
    });
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
