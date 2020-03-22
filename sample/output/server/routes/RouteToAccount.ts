/* This file was automatically generated and should not be edited. */
import { generateUrl } from 'route-codegen';

import { patternAccount as pattern } from './patternAccount';

interface UrlParts {
  urlQuery?: Partial<Record<string, string>>;
}

interface DefaultRoute {
  pattern: string;
  generate: (urlParts: UrlParts) => string;
}

const RouteToAccount: DefaultRoute = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
};

export default RouteToAccount;
