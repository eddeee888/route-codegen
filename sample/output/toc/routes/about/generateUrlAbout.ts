/* This file was automatically generated with route-codegen and should not be edited. */
import { generateUrl } from 'route-codegen';
import { patternAbout, UrlPartsAbout } from './patternAbout';
const generateUrlAbout = (urlParts: UrlPartsAbout): string => generateUrl(patternAbout, {}, urlParts.urlQuery);
export default generateUrlAbout;
