/* This file was automatically generated with route-codegen and should not be edited. */
export const patternActivateAccount = "/activate-account/:code";
export const originActivateAccount = "https://api.domain.com";

export type PathParamsActivateAccount = { code: string };

export const possilePathParamsActivateAccount = ["code"];
export interface UrlPartsActivateAccount {
  path: PathParamsActivateAccount;
  query?: Record<string, string | undefined>;
  origin?: string;
}
