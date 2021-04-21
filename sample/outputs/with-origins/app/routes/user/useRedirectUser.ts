/* This file was automatically generated with route-codegen and should not be edited. */
import { useHistory } from "react-router";
import { UrlParamsUser, patternUser } from "./patternUser";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnUser = (urlParams: UrlParamsUser) => void;
export const useRedirectUser = (): RedirectFnUser => {
  const history = useHistory();
  const redirect: RedirectFnUser = (urlParams) => {
    const to = generateUrl(patternUser, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin });
    history.push(to);
  };
  return redirect;
};
