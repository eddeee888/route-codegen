/* This file was automatically generated with route-codegen and should not be edited. */
export const patternUser = "/users/:id/:subview(pictures)?";
export const originUser = `https://api.${MAIN_DOMAIN}`;

export type PathParamsUser = { id: string; subview?: "pictures" };

export const possilePathParamsUser = ["id", "subview"];
export interface UrlPartsUser {
  path: PathParamsUser;
  urlQuery?: Record<string, string>;
  origin?: string;
}
