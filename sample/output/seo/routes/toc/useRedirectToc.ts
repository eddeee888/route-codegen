/* This file was automatically generated with route-codegen and should not be edited. */
import { UrlPartsToc, patternToc } from './patternToc';
import { generateUrl } from 'route-codegen';
export type RedirectToc = (urlParts: UrlPartsToc) => void;
const useRedirectToc = (): RedirectToc => {
  const redirect: RedirectToc = urlParts => {
    const to = generateUrl(patternToc, {}, urlParts.urlQuery);
    if (!!window && !!window.location) {
      window.location.href = to;
    }
    return;
  };
  return redirect;
};
export default useRedirectToc;
