import { generateUrl } from 'route-codegen';
import { patternLogin, UrlPartsLogin } from './patternLogin';
const generateUrlLogin = (urlParts: UrlPartsLogin) => generateUrl(patternLogin, {}, urlParts.urlQuery);
export default generateUrlLogin;
