/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternToc, UrlParamsToc, originToc } from "./patternToc";
export const generateUrlToc = (urlParams?: UrlParamsToc): string =>
  generateUrl(patternToc, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originToc });
