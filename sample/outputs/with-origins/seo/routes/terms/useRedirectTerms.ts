/* This file was automatically generated with route-codegen and should not be edited. */
import { useRouter } from "next/router";
import { UrlParamsTerms, patternNextJSTerms } from "./patternTerms";
export type RedirectFnTerms = (urlParams?: UrlParamsTerms) => void;
export const useRedirectTerms = (): RedirectFnTerms => {
  const router = useRouter();
  const redirect: RedirectFnTerms = (urlParams) => {
    const query = urlParams?.query ?? {};
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
