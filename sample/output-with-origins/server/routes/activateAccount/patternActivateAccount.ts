/* This file was automatically generated with route-codegen and should not be edited. */
export const patternActivateAccount = "/activate-account/:code";
export const originActivateAccount = `https://api.${MAIN_DOMAIN}`;

export type PathParamsActivateAccount = { code: string };

export const possilePathParamsActivateAccount = ["code"];
export interface UrlPartsActivateAccount {
  path: PathParamsActivateAccount;
  urlQuery?: Record<string, string>;
  origin?: string;
}
