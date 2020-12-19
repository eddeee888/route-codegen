/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from "@route-codegen/utils";
import { patternContact, UrlPartsContact, originContact } from "./patternContact";
const generateUrlContact = (urlParts: UrlPartsContact): string =>
  generateUrl(patternContact, urlParts.path, urlParts?.query, urlParts?.origin ?? originContact);
export default generateUrlContact;
