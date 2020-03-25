/* This file was automatically generated and should not be edited. */

import { generateUrl } from 'route-codegen';
import { patternLegacy as pattern, UrlPartsLegacy } from './patternLegacy';

interface DefaultRoute {
  pattern: string;
  generate: (urlParts: UrlPartsLegacy) => string;
}

const RouteToLegacy: DefaultRoute = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
};

export default RouteToLegacy;
