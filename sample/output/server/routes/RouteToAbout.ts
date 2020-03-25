/* This file was automatically generated and should not be edited. */

import { generateUrl } from 'route-codegen';
import { patternAbout as pattern, UrlPartsAbout } from './patternAbout';

interface DefaultRoute {
  pattern: string;
  generate: (urlParts: UrlPartsAbout) => string;
}

const RouteToAbout: DefaultRoute = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
};

export default RouteToAbout;
