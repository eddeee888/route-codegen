import { Key, pathToRegexp } from 'path-to-regexp';

const getKeysFromRoutePattern = (routePattern: string): Key[] => {
  const keys: Key[] = [];
  pathToRegexp(routePattern, keys);
  return keys;
};

export default getKeysFromRoutePattern;
