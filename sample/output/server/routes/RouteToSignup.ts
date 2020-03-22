/* This file was automatically generated and should not be edited. */
import { generateUrl } from 'route-codegen';

import { patternSignup as pattern } from './patternSignup';

interface UrlParts {
  urlQuery?: Partial<Record<string, string>>;
}

interface DefaultRoute {
  pattern: string;
  generate: (urlParts: UrlParts) => string;
}

const RouteToSignup: DefaultRoute = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
};

export default RouteToSignup;
