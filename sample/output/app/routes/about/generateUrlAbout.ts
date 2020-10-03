/* This file was automatically generated with route-codegen and should not be edited. */
import generateUrl from "route-codegen/generateUrl";
import { patternAbout, UrlPartsAbout, originAbout } from "./patternAbout";
const generateUrlAbout = (urlParts: UrlPartsAbout): string =>
  generateUrl(patternAbout, urlParts.path, urlParts?.query, urlParts?.origin ?? originAbout);
export default generateUrlAbout;
