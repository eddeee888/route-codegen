import { generateUrl } from 'route-codegen';
import { patternLogin, UrlPartsLogin } from './patternLogin';
const generateUrlLogin = (urlParts: UrlPartsLogin): string => generateUrl(patternLogin, {}, urlParts.urlQuery);
export default generateUrlLogin;
