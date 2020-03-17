/* This file was automatically generated and should not be edited. */
import { generateUrl } from 'route-codegen';

const pattern = '/app/users/:id/:subview(profile|pictures)?';

export interface RouteToUserPathParams {
  id: string;
  subview?: 'profile' | 'pictures';
}

interface UrlParts<P> {
  path: P;
  urlQuery?: Partial<Record<string, string>>;
}

interface DefaultRoute<P> {
  pattern: string;
  generate: (urlParts: UrlParts<P>) => string;
}

const RouteToUser: DefaultRoute<RouteToUserPathParams> = {
  pattern,
  generate: ({ path, urlQuery }) => generateUrl(pattern, path, urlQuery),
};

export default RouteToUser;
