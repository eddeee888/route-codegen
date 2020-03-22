/* This file was automatically generated and should not be edited. */
import { generateUrl } from 'route-codegen';

import { patternLogin as pattern } from './patternLogin';

interface UrlParts {
  urlQuery?: Partial<Record<string, string>>;
}

interface DefaultRoute {
  pattern: string;
  generate: (urlParts: UrlParts) => string;
}

const RouteToLogin: DefaultRoute = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
};

export default RouteToLogin;
