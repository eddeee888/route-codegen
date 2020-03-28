import { generateUrl } from 'route-codegen';
import { patternAccount, UrlPartsAccount } from './patternAccount';
const generateUrlAccount = (urlParts: UrlPartsAccount): string => generateUrl(patternAccount, {}, urlParts.urlQuery);
export default generateUrlAccount;
