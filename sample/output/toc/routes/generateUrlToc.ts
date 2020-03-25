import { generateUrl } from 'route-codegen';
import { patternToc, UrlPartsToc } from './patternToc';
const generateUrlToc = (urlParts: UrlPartsToc) => generateUrl(patternToc, {}, urlParts.urlQuery);
export default generateUrlToc;
