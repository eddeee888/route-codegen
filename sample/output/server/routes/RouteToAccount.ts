/* This file was automatically generated and should not be edited. */

import { generateUrl } from 'route-codegen';
import { patternAccount as pattern, UrlPartsAccount } from './patternAccount';

interface DefaultRoute {
  pattern: string;
  generate: (urlParts: UrlPartsAccount) => string;
}

const RouteToAccount: DefaultRoute = {
  pattern,
  generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),
};

export default RouteToAccount;
