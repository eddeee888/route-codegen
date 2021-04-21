/* This file was automatically generated with route-codegen and should not be edited. */
import { useRouter } from "next/router";
import { UrlParamsToc, patternNextJSToc } from "./patternToc";
export type RedirectFnToc = (urlParts?: UrlParamsToc) => void;
export const useRedirectToc = (): RedirectFnToc => {
  const router = useRouter();
  const redirect: RedirectFnToc = (urlParts) => {
    const query = urlParts?.query ?? {};
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
