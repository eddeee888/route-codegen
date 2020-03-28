import { generateUrl } from 'route-codegen';
import { patternUser, UrlPartsUser } from './patternUser';
const generateUrlUser = (urlParts: UrlPartsUser): string => generateUrl(patternUser, urlParts.path, urlParts.urlQuery);
export default generateUrlUser;
