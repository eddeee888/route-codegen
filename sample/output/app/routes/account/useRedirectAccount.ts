/* This file was automatically generated with route-codegen and should not be edited. */
import { useHistory } from 'react-router';
import { UrlPartsAccount, patternAccount } from './patternAccount';
import { generateUrl } from 'route-codegen';

const useRedirectAccount = (urlParts: UrlPartsAccount): (() => void) => {
  const history = useHistory();
  const to = generateUrl(patternAccount, {}, urlParts.urlQuery);
  return () => history.push(to);
};
export default useRedirectAccount;
