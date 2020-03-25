import { generateUrl } from 'route-codegen';
import { patternSignup, UrlPartsSignup } from './patternSignup';
const generateUrlSignup = (urlParts: UrlPartsSignup) => generateUrl(patternSignup, {}, urlParts.urlQuery);
export default generateUrlSignup;
