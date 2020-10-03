/* This file was automatically generated with route-codegen and should not be edited. */
import { useRouter } from "next/router";
import { UrlPartsTerms, patternNextJSTerms } from "./patternTerms";
export type RedirectFnTerms = (urlParts?: UrlPartsTerms) => void;
const useRedirectTerms = (): RedirectFnTerms => {
  const router = useRouter();
  const redirect: RedirectFnTerms = (urlParts) => {
    const query = urlParts?.urlQuery ?? {};
    const path = {};
    router.push({
      pathname: patternNextJSTerms,
      query: {
        ...path,
        ...query,
      },
    });
  };
  return redirect;
};
export default useRedirectTerms;
