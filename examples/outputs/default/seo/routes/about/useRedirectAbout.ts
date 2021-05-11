/* This file was automatically generated with route-codegen and should not be edited. */
import { useRouter } from "next/router";
import { generateUrl } from "@route-codegen/utils";
import { UrlParamsAbout, patternAbout } from "./patternAbout";
export type RedirectFnAbout = (urlParams: UrlParamsAbout) => void;
export const useRedirectAbout = (): RedirectFnAbout => {
  const router = useRouter();
  const redirect: RedirectFnAbout = (urlParams) => {
    const href = generateUrl(patternAbout, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin });
    router.push(href);
  };
  return redirect;
};
