/* This file was automatically generated with route-codegen and should not be edited. */
import { useHistory } from "react-router";
import { UrlPartsUser, patternUser } from "./patternUser";
import { generateUrl } from "@route-codegen/utils";
export type RedirectFnUser = (urlParts: UrlPartsUser) => void;
export const useRedirectUser = (): RedirectFnUser => {
  const history = useHistory();
  const redirect: RedirectFnUser = (urlParts) => {
    const to = generateUrl({ pattern: patternUser, path: urlParts.path, query: urlParts?.query, origin: urlParts?.origin });
    history.push(to);
  };
  return redirect;
};
