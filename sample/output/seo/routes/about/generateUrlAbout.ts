import { generateUrl } from 'route-codegen';
import { patternAbout, UrlPartsAbout } from './patternAbout';
const generateUrlAbout = (urlParts: UrlPartsAbout) => generateUrl(patternAbout, {}, urlParts.urlQuery);
export default generateUrlAbout;
