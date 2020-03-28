import { generateUrl } from 'route-codegen';
import { patternLegacy, UrlPartsLegacy } from './patternLegacy';
const generateUrlLegacy = (urlParts: UrlPartsLegacy): string => generateUrl(patternLegacy, {}, urlParts.urlQuery);
export default generateUrlLegacy;
