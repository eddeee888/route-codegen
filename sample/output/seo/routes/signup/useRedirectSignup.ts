/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlPartsSignup, patternSignup } from './patternSignup';
import { generateUrl } from 'route-codegen';

const useRedirectSignup = (urlParts: UrlPartsSignup): (() => void) => {
  const to = generateUrl(patternSignup, {}, urlParts.urlQuery);
  return () => (!!window && !!window.location ? (window.location.href = to) : undefined);
};
export default useRedirectSignup;
