import { generateUrl } from 'route-codegen';
import { patternToc, UrlPartsToc } from './patternToc';
const generateUrlToc = (urlParts: UrlPartsToc): string => generateUrl(patternToc, {}, urlParts.urlQuery);
export default generateUrlToc;
