/* This file was automatically generated and should not be edited. */

import { generateUrl } from 'route-codegen';
import { patternToc as pattern, UrlPartsToc } from './patternToc';

interface DefaultRoute {
  pattern: string;
  generate: (urlParts: UrlPartsToc) => string;
}

const RouteToToc: DefaultRoute = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
};

export default RouteToToc;
