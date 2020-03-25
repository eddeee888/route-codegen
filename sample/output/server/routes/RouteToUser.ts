/* This file was automatically generated and should not be edited. */

import { generateUrl } from 'route-codegen';
import { patternUser as pattern, UrlPartsUser, PathParamsUser } from './patternUser';

interface DefaultRoute<P> {
  pattern: string;
  generate: (urlParts: UrlPartsUser) => string;
}

const RouteToUser: DefaultRoute<PathParamsUser> = {
  pattern,
  generate: ({ path, urlQuery }) => generateUrl(pattern, path, urlQuery),
};

export default RouteToUser;
