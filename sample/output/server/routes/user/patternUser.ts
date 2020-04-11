/* This file was automatically generated with route-codegen and should not be edited. */
export const patternUser = '/app/users/:id/:subview(profile|pictures)?';

export interface PathParamsUser {
  id: string;
  subview?: 'profile' | 'pictures';
}
export interface UrlPartsUser {
  path: PathParamsUser;
  urlQuery?: Record<string, string>;
}
