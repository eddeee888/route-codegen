import { generateUrl } from 'route-codegen';
import { patternHome, UrlPartsHome } from './patternHome';
const generateUrlHome = (urlParts: UrlPartsHome) => generateUrl(patternHome, {}, urlParts.urlQuery);
export default generateUrlHome;
