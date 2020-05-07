/* This file was automatically generated with route-codegen and should not be edited. */
import Router from "next/router";
import { patternAbout, UrlPartsAbout, patternNextJSAbout, possilePathParamsAbout } from "./patternAbout";
import generateUrl from "route-codegen/generateUrl";
export type RedirectAbout = (urlParts: UrlPartsAbout) => void;
const useRedirectAbout = (): RedirectAbout => {
  const redirect: RedirectAbout = (urlParts) => {
    const to = generateUrl(patternAbout, urlParts.path, urlParts.urlQuery);
    const url = possilePathParamsAbout
      .filter((key) => !(key in urlParts.path))
      .reduce((prevPattern, suppliedParam) => prevPattern.replace(`/[${suppliedParam}]`, ""), patternNextJSAbout);
    Router.push(url, to);
  };
  return redirect;
};
export default useRedirectAbout;
