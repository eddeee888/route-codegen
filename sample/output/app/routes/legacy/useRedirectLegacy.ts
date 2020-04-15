/* This file was automatically generated with route-codegen and should not be edited. */

import { UrlPartsLegacy, patternLegacy } from './patternLegacy';
import { generateUrl } from 'route-codegen';

const useRedirectLegacy = (urlParts: UrlPartsLegacy): (() => void) => {
  const to = generateUrl(patternLegacy, {}, urlParts.urlQuery);
  return () => (!!window && !!window.location ? (window.location.href = to) : undefined);
};
export default useRedirectLegacy;
