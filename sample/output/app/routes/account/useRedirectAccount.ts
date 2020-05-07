/* This file was automatically generated with route-codegen and should not be edited. */
import { useHistory } from "react-router";
import { UrlPartsAccount, patternAccount } from "./patternAccount";
import generateUrl from "route-codegen/generateUrl";
export type RedirectFnAccount = (urlParts?: UrlPartsAccount) => void;
const useRedirectAccount = (): RedirectFnAccount => {
  const history = useHistory();
  const redirect: RedirectFnAccount = (urlParts) => {
    const to = generateUrl(patternAccount, {}, urlParts?.urlQuery);
    history.push(to);
  };
  return redirect;
};
export default useRedirectAccount;
