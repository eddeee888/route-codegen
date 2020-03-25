/* This file was automatically generated and should not be edited. */

import { generateUrl } from 'route-codegen';
import { patternSignup as pattern, UrlPartsSignup } from './patternSignup';

interface DefaultRoute {
  pattern: string;
  generate: (urlParts: UrlPartsSignup) => string;
}

const RouteToSignup: DefaultRoute = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
};

export default RouteToSignup;
