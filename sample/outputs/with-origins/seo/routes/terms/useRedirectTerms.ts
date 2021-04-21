/* This file was automatically generated with route-codegen and should not be edited. */
import { useRouter } from "next/router";
import { UrlPartsTerms, patternNextJSTerms } from "./patternTerms";
export type RedirectFnTerms = (urlParts?: UrlPartsTerms) => void;
export const useRedirectTerms = (): RedirectFnTerms => {
  const router = useRouter();
  const redirect: RedirectFnTerms = (urlParts) => {
    const query = urlParts?.query ?? {};
    const path = {};
    const pathname = patternNextJSTerms;
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
