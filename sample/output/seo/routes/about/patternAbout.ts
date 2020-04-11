/* This file was automatically generated with route-codegen and should not be edited. */
export const patternAbout = '/about/:target(us|you)/:topic';
export const patternNextJSAbout = '/about/[target]/[topic]';
export interface PathParamsAbout {
  target: 'us' | 'you';
  topic: string;
}
export interface UrlPartsAbout {
  path: PathParamsAbout;
  urlQuery?: Record<string, string>;
}
