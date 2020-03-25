/* This file was automatically generated and should not be edited. */

import { generateUrl } from 'route-codegen';
import { patternHome as pattern, UrlPartsHome } from './patternHome';

interface DefaultRoute {
  pattern: string;
  generate: (urlParts: UrlPartsHome) => string;
}

const RouteToHome: DefaultRoute = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
};

export default RouteToHome;
