/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlPartsToc, patternToc } from './patternToc';
import { generateUrl } from 'route-codegen';

const useRedirectToc = (urlParts: UrlPartsToc): (() => void) => {
  const to = generateUrl(patternToc, {}, urlParts.urlQuery);
  return () => (!!window && !!window.location ? (window.location.href = to) : undefined);
};
export default useRedirectToc;
