/* This file was automatically generated with route-codegen and should not be edited. */
import { useRouter } from "next/router";
import { UrlPartsToc, patternNextJSToc } from "./patternToc";
export type RedirectFnToc = (urlParts?: UrlPartsToc) => void;
const useRedirectToc = (): RedirectFnToc => {
  const router = useRouter();
  const redirect: RedirectFnToc = (urlParts) => {
    const query = urlParts?.urlQuery ?? {};
    const path = {};
    const pathname = patternNextJSToc;
    router.push({
      pathname: pathname,
      query: {
        ...path,
        ...query,
      },
    });
  };
  return redirect;
};
export default useRedirectToc;
