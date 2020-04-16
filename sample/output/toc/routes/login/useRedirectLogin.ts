/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlPartsLogin, patternLogin } from './patternLogin';
import { generateUrl } from 'route-codegen';

const useRedirectLogin = (urlParts: UrlPartsLogin): (() => void) => {
  const to = generateUrl(patternLogin, {}, urlParts.urlQuery);
  return () => (!!window && !!window.location ? (window.location.href = to) : undefined);
};
export default useRedirectLogin;
