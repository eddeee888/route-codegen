/* This file was automatically generated and should not be edited. */

import { generateUrl } from 'route-codegen';

import { patternToc as pattern } from './patternToc';

interface UrlParts {
  urlQuery?: Partial<Record<string, string>>;
}

interface DefaultRoute {
  pattern: string;
  generate: (urlParts: UrlParts) => string;
}

const RouteToToc: DefaultRoute = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
};

export default RouteToToc;
