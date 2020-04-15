/* This file was automatically generated with route-codegen and should not be edited. */

import { UrlPartsHome, patternHome } from './patternHome';
import { generateUrl } from 'route-codegen';

const useRedirectHome = (urlParts: UrlPartsHome): (() => void) => {
  const to = generateUrl(patternHome, {}, urlParts.urlQuery);
  return () => (!!window && !!window.location ? (window.location.href = to) : undefined);
};
export default useRedirectHome;
