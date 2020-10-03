/* This file was automatically generated with route-codegen and should not be edited. */
import { useRouter } from "next/router";
import { UrlPartsHome, patternNextJSHome } from "./patternHome";
export type RedirectFnHome = (urlParts?: UrlPartsHome) => void;
const useRedirectHome = (): RedirectFnHome => {
  const router = useRouter();
  const redirect: RedirectFnHome = (urlParts) => {
    const query = urlParts?.urlQuery ?? {};
    const path = {};
    router.push({
      pathname: patternNextJSHome,
      query: {
        ...path,
        ...query,
      },
    });
  };
  return redirect;
};
export default useRedirectHome;
