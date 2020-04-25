/* This file was automatically generated with route-codegen and should not be edited. */
import { useHistory } from 'react-router';
import { UrlPartsUser, patternUser } from './patternUser';
import { generateUrl } from 'route-codegen';
type RedirectUser = (urlParts: UrlPartsUser) => void;
const useRedirectUser = (): RedirectUser => {
  const history = useHistory();
  const redirect: RedirectUser = urlParts => {
    const to = generateUrl(patternUser, urlParts.path, urlParts.urlQuery);
    history.push(to);
  };
  return redirect;
};
export default useRedirectUser;
