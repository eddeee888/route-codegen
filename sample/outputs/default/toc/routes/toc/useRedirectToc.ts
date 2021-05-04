/* This file was automatically generated with route-codegen and should not be edited. */
import { useRouter } from "next/router";
import { generateUrl } from "@route-codegen/utils";
import { UrlParamsToc, patternToc } from "./patternToc";
export type RedirectFnToc = (urlParams?: UrlParamsToc) => void;
export const useRedirectToc = (): RedirectFnToc => {
  const router = useRouter();
  const redirect: RedirectFnToc = (urlParams) => {
    const href = generateUrl(patternToc, { path: {}, query: urlParams?.query, origin: urlParams?.origin });
    router.push(href);
  };
  return redirect;
};
