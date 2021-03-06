import { compile, PathFunction } from "path-to-regexp";

// eslint-disable-next-line @typescript-eslint/ban-types
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

const generatePath = (path = "/", params = {}): string => {
  return path === "/" ? path : compilePath(path)(params);
};

const generateQueryString = (query?: Record<string, string | undefined>): string => {
  if (!query) {
    return "";
  }

  const filteredQuery = Object.entries(query).filter<[string, string]>((obj): obj is [string, string] => {
    const value = obj[1];
    return value !== undefined;
  });
  if (filteredQuery.length === 0) {
    return "";
  }

  return `?${new URLSearchParams(filteredQuery).toString()}`;
};

export interface UrlParams<P> {
  path: P;
  query?: Record<string, string | undefined>;
  origin?: string;
}

export type GenerateUrl = <P>(pattern: string, urlParams: UrlParams<P>) => string;

export const generateUrl: GenerateUrl = (pattern, { path, query, origin }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (origin ?? "") + generatePath(pattern, path as any) + generateQueryString(query);
};
