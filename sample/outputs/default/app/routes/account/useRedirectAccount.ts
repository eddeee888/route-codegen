/* This file was automatically generated with route-codegen and should not be edited. */
import { useHistory } from "react-router";
import { UrlPartsAccount, patternAccount } from "./patternAccount";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnAccount = (urlParts?: UrlPartsAccount) => void;
export const useRedirectAccount = (): RedirectFnAccount => {
  const history = useHistory();
  const redirect: RedirectFnAccount = (urlParts) => {
    const to = generateUrl({ pattern: patternAccount, path: {}, query: urlParts?.query, origin: urlParts?.origin });
    history.push(to);
  };
  return redirect;
};
