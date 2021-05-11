/* This file was automatically generated with route-codegen and should not be edited. */
import { useRouter } from "next/router";
import { generateUrl } from "@route-codegen/utils";
import { UrlParamsContact, patternContact } from "./patternContact";
export type RedirectFnContact = (urlParams: UrlParamsContact) => void;
export const useRedirectContact = (): RedirectFnContact => {
  const router = useRouter();
  const redirect: RedirectFnContact = (urlParams) => {
    const href = generateUrl(patternContact, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin });
    router.push(href);
  };
  return redirect;
};
