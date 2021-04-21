/* This file was automatically generated with route-codegen and should not be edited. */
import { useRouter } from "next/router";
import { UrlParamsHome, patternNextJSHome } from "./patternHome";
export type RedirectFnHome = (urlParts?: UrlParamsHome) => void;
export const useRedirectHome = (): RedirectFnHome => {
  const router = useRouter();
  const redirect: RedirectFnHome = (urlParts) => {
    const query = urlParts?.query ?? {};
    const path = {};
    const pathname = patternNextJSHome;
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
