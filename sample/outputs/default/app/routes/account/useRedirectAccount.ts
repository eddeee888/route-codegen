/* This file was automatically generated with route-codegen and should not be edited. */
import { useHistory } from "react-router";
import { UrlParamsAccount, patternAccount } from "./patternAccount";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnAccount = (urlParts?: UrlParamsAccount) => void;
export const useRedirectAccount = (): RedirectFnAccount => {
  const history = useHistory();
  const redirect: RedirectFnAccount = (urlParts) => {
    const to = generateUrl(patternAccount, { path: {}, query: urlParts?.query, origin: urlParts?.origin });
    history.push(to);
  };
  return redirect;
};
