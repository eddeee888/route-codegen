/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternUser, UrlPartsUser, originUser } from "./patternUser";
const generateUrlUser = (urlParts: UrlPartsUser): string =>
  generateUrl(patternUser, urlParts.path, urlParts?.query, urlParts?.origin ?? originUser);
export default generateUrlUser;
