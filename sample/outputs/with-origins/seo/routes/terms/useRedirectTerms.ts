/* This file was automatically generated with route-codegen and should not be edited. */
import { useRouter } from "next/router";
import { generateUrl } from "@route-codegen/utils";
import { UrlParamsTerms, patternTerms } from "./patternTerms";
export type RedirectFnTerms = (urlParams?: UrlParamsTerms) => void;
export const useRedirectTerms = (): RedirectFnTerms => {
  const router = useRouter();
  const redirect: RedirectFnTerms = (urlParams) => {
    const href = generateUrl(patternTerms, { path: {}, query: urlParams?.query, origin: urlParams?.origin });
    router.push(href);
  };
  return redirect;
};
