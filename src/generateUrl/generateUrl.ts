import { compile, PathFunction } from 'path-to-regexp';

const cache: Record<string, (data?: object) => string> = {};
const cacheLimit = 10000;
let cacheCount = 0;

const compilePath = (path: string): PathFunction => {
  if (cache[path]) {
    return cache[path];
  }

  const generator = compile(path);

  if (cacheCount < cacheLimit) {
    cache[path] = generator;
    cacheCount++;
  }

  return generator;
};

const generatePath = (path = '/', params = {}): string => {
  return path === '/' ? path : compilePath(path)(params);
};

const generateQueryString = (urlQuery?: Record<string, string>): string => {
  if (!urlQuery) {
    return '';
  }

  const result = Object.entries(urlQuery).reduce((prev, [key, value]) => prev.concat(key, '=', value, '&'), '?');
  // remove the final '&'
  return result.substring(0, result.length - 1);
};

export type GenerateUrl = <P>(pattern: string, inputParams: P, urlQuery?: Record<string, string>) => string;
const generateUrl: GenerateUrl = (pattern, inputParams, urlQuery) =>
  generatePath(pattern, inputParams as any) + generateQueryString(urlQuery);

export default generateUrl;
