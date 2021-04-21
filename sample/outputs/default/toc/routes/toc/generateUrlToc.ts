/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternToc, UrlPartsToc, originToc } from "./patternToc";
export const generateUrlToc = (urlParts?: UrlPartsToc): string =>
  generateUrl({ pattern: patternToc, path: {}, query: urlParts?.query, origin: urlParts?.origin ?? originToc });
