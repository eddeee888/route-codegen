import { generateUrl } from 'route-codegen';
import { patternLegacy, UrlPartsLegacy } from './patternLegacy';
const generateUrlLegacy = (urlParts: UrlPartsLegacy) => generateUrl(patternLegacy, {}, urlParts.urlQuery);
export default generateUrlLegacy;
