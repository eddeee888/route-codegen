/* This file was automatically generated and should not be edited. */

import { generateUrl } from 'route-codegen';
import { patternLogin as pattern, UrlPartsLogin } from './patternLogin';

interface DefaultRoute {
  pattern: string;
  generate: (urlParts: UrlPartsLogin) => string;
}

const RouteToLogin: DefaultRoute = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
};

export default RouteToLogin;
