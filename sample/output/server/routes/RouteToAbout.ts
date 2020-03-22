/* This file was automatically generated and should not be edited. */

import { generateUrl } from 'route-codegen';

import { patternAbout as pattern } from './patternAbout';

interface UrlParts {
  urlQuery?: Partial<Record<string, string>>;
}

interface DefaultRoute {
  pattern: string;
  generate: (urlParts: UrlParts) => string;
}

const RouteToAbout: DefaultRoute = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
};

export default RouteToAbout;
