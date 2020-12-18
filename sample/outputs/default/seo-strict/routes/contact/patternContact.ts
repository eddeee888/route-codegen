/* This file was automatically generated with route-codegen and should not be edited. */
export const patternContact = "/contact/:target(us|you)/:topic/:optional?/:optionalEnum(enumOne|enumTwo)?";
export const originContact = "";
export const patternNextJSContact = "/contact/[target]/[topic]/[optional]/[optionalEnum]";
export type PathParamsContact = { target: "us" | "you"; topic: string; optional?: string; optionalEnum?: "enumOne" | "enumTwo" };

export const possilePathParamsContact = ["target", "topic", "optional", "optionalEnum"];
export interface UrlPartsContact {
  path: PathParamsContact;
  query?: Record<string, string | undefined>;
  origin?: string;
}
