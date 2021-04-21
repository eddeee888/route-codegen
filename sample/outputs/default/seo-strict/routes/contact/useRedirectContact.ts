/* This file was automatically generated with route-codegen and should not be edited. */
import { useRouter } from "next/router";
import { UrlPartsContact, patternNextJSContact, possilePathParamsContact } from "./patternContact";
export type RedirectFnContact = (urlParts: UrlPartsContact) => void;
export const useRedirectContact = (): RedirectFnContact => {
  const router = useRouter();
  const redirect: RedirectFnContact = (urlParts) => {
    const query = urlParts?.query ?? {};
    const path = urlParts.path;
    const pathname = possilePathParamsContact
      .filter((key) => !(key in urlParts.path))
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
