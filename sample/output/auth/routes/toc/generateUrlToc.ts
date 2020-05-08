/* This file was automatically generated with route-codegen and should not be edited. */
import generateUrl from "route-codegen/generateUrl";
import { patternToc, UrlPartsToc } from "./patternToc";
const generateUrlToc = (urlParts?: UrlPartsToc): string => generateUrl(patternToc, {}, urlParts?.urlQuery);
export default generateUrlToc;
