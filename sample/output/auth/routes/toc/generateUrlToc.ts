/* This file was automatically generated with route-codegen and should not be edited. */
import generateUrl from "route-codegen/generateUrl";
import { patternToc, UrlPartsToc, originToc } from "./patternToc";
const generateUrlToc = (urlParts?: UrlPartsToc): string => generateUrl(patternToc, {}, urlParts?.urlQuery, urlParts?.origin ?? originToc);
export default generateUrlToc;
