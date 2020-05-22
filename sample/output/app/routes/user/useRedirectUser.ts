/* This file was automatically generated with route-codegen and should not be edited. */
import { useHistory } from "react-router";
import { UrlPartsUser, patternUser } from "./patternUser";
import generateUrl from "route-codegen/generateUrl";
export type RedirectFnUser = (urlParts: UrlPartsUser) => void;
const useRedirectUser = (): RedirectFnUser => {
  const history = useHistory();
  const redirect: RedirectFnUser = (urlParts) => {
    const to = generateUrl(patternUser, urlParts.path, urlParts?.urlQuery, urlParts?.origin);
    history.push(to);
  };
  return redirect;
};
export default useRedirectUser;
