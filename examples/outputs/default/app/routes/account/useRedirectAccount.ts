/* This file was automatically generated with route-codegen and should not be edited. */
import { useHistory } from "react-router";
import { UrlParamsAccount, patternAccount } from "./patternAccount";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnAccount = (urlParams?: UrlParamsAccount) => void;
export const useRedirectAccount = (): RedirectFnAccount => {
  const history = useHistory();
  const redirect: RedirectFnAccount = (urlParams) => {
    const to = generateUrl(patternAccount, { path: {}, query: urlParams?.query, origin: urlParams?.origin });
    history.push(to);
  };
  return redirect;
};
