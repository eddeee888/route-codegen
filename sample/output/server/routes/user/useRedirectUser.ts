/* This file was automatically generated with route-codegen and should not be edited. */

import { UrlPartsUser, patternUser } from './patternUser';
import { generateUrl } from 'route-codegen';

const useRedirectUser = (urlParts: UrlPartsUser): (() => void) => {
  const to = generateUrl(patternUser, urlParts.path, urlParts.urlQuery);
  return () => (!!window && !!window.location ? (window.location.href = to) : undefined);
};
export default useRedirectUser;
