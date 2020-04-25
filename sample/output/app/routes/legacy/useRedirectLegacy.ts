/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlPartsLegacy, patternLegacy } from './patternLegacy';
import { generateUrl } from 'route-codegen';
export type RedirectLegacy = (urlParts: UrlPartsLegacy) => void;
const useRedirectLegacy = (): RedirectLegacy => {
  const redirect: RedirectLegacy = urlParts => {
    const to = generateUrl(patternLegacy, {}, urlParts.urlQuery);
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
export default useRedirectLegacy;
