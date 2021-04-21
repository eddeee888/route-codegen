/* This file was automatically generated with route-codegen and should not be edited. */
export const patternUser = "/app/users/:id/:subview(pictures)?";
export const originUser = "";

export type PathParamsUser = { id: string; subview?: "pictures" };

export const possilePathParamsUser = ["id", "subview"];
export interface UrlParamsUser {
  path: PathParamsUser;
  query?: Record<string, string | undefined>;
  origin?: string;
}
