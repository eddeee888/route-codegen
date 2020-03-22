/* This file was automatically generated and should not be edited. */
import { generateUrl } from 'route-codegen';

import { patternUser as pattern, UserPathParams } from './patternUser';

interface UrlParts<P> {
  path: P;
  urlQuery?: Partial<Record<string, string>>;
}

interface DefaultRoute<P> {
  pattern: string;
  generate: (urlParts: UrlParts<P>) => string;
}

const RouteToUser: DefaultRoute<UserPathParams> = {
  pattern,
  generate: ({ path, urlQuery }) => generateUrl(pattern, path, urlQuery),
};

export default RouteToUser;
