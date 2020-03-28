import { generateUrl } from 'route-codegen';
import { patternSignup, UrlPartsSignup } from './patternSignup';
const generateUrlSignup = (urlParts: UrlPartsSignup): string => generateUrl(patternSignup, {}, urlParts.urlQuery);
export default generateUrlSignup;
