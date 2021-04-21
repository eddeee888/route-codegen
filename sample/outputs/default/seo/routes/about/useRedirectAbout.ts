/* This file was automatically generated with route-codegen and should not be edited. */
import { useRouter } from "next/router";
import { UrlParamsAbout, patternNextJSAbout, possilePathParamsAbout } from "./patternAbout";
export type RedirectFnAbout = (urlParts: UrlParamsAbout) => void;
export const useRedirectAbout = (): RedirectFnAbout => {
  const router = useRouter();
  const redirect: RedirectFnAbout = (urlParts) => {
    const query = urlParts?.query ?? {};
    const path = urlParts.path;
    const pathname = possilePathParamsAbout
      .filter((key) => !(key in urlParts.path))
      .reduce((prevPattern, suppliedParam) => prevPattern.replace(`/[${suppliedParam}]`, ""), patternNextJSAbout);
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
