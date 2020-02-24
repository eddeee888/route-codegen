import pathToRegexp from 'path-to-regexp';

const cache: Record<string, (data?: object) => string> = {};
const cacheLimit = 10000;
let cacheCount = 0;

function compilePath(path: string): pathToRegexp.PathFunction {
  if (cache[path]) {
    return cache[path];
  }

  const generator = pathToRegexp.compile(path);

  if (cacheCount < cacheLimit) {
    cache[path] = generator;
    cacheCount++;
  }

  return generator;
}

function generatePath(path = '/', params = {}): string {
  return path === '/' ? path : compilePath(path)(params);
}

export type GenerateUrl = <P>(pattern: string, inputParams: P, urlQuery?: Record<string, string>) => string;

const generateQueryString = (urlQuery?: Record<string, string>): string => {
  if (!urlQuery) {
    return '';
  }

  let result = '?';
  Object.keys(urlQuery).forEach(queryKey => {
    result += `${queryKey}=${urlQuery[queryKey]}&`;
  });
  result = result.substring(0, result.length - 1);

  return result;
};

const generateUrl: GenerateUrl = <P>(pattern: string, inputParams: P, urlQuery?: Record<string, string>): string =>
  generatePath(pattern, inputParams as any) + generateQueryString(urlQuery);

export default generateUrl;
