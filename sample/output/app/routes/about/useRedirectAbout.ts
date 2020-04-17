/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlPartsAbout, patternAbout } from './patternAbout';
import { generateUrl } from 'route-codegen';

const useRedirectAbout = (urlParts: UrlPartsAbout): (() => void) => {
  const to = generateUrl(patternAbout, urlParts.path, urlParts.urlQuery);
  return () => (!!window && !!window.location ? (window.location.href = to) : undefined);
};
export default useRedirectAbout;
