/* This file was automatically generated with route-codegen and should not be edited. */
import { useRouter } from "next/router";
import { UrlPartsAbout, patternNextJSAbout } from "./patternAbout";
export type RedirectFnAbout = (urlParts: UrlPartsAbout) => void;
const useRedirectAbout = (): RedirectFnAbout => {
  const router = useRouter();
  const redirect: RedirectFnAbout = (urlParts) => {
    const query = urlParts?.urlQuery ?? {};
    const path = urlParts.path;
    router.push({
      pathname: patternNextJSAbout,
      query: {
        ...path,
        ...query,
      },
    });
  };
  return redirect;
};
export default useRedirectAbout;
