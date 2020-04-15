/* This file was automatically generated with route-codegen and should not be edited. */

import { UrlPartsAccount, patternAccount } from './patternAccount';
import { generateUrl } from 'route-codegen';

const useRedirectAccount = (urlParts: UrlPartsAccount): (() => void) => {
  const to = generateUrl(patternAccount, {}, urlParts.urlQuery);
  return () => (!!window && !!window.location ? (window.location.href = to) : undefined);
};
export default useRedirectAccount;
