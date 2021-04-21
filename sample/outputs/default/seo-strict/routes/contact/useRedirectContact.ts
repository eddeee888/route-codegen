/* This file was automatically generated with route-codegen and should not be edited. */
import { useRouter } from "next/router";
import { UrlParamsContact, patternNextJSContact, possilePathParamsContact } from "./patternContact";
export type RedirectFnContact = (urlParams: UrlParamsContact) => void;
export const useRedirectContact = (): RedirectFnContact => {
  const router = useRouter();
  const redirect: RedirectFnContact = (urlParams) => {
    const query = urlParams?.query ?? {};
    const path = urlParams.path;
    const pathname = possilePathParamsContact
      .filter((key) => !(key in urlParams.path))
      .reduce((prevPattern, suppliedParam) => prevPattern.replace(`/[${suppliedParam}]`, ""), patternNextJSContact);
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
