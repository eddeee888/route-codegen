/* This file was automatically generated with route-codegen and should not be edited. */
export const patternContact = "/contact/:target(us|you)/:topic/:region(en)/:optional?/:optionalEnum(enumOne|enumTwo)?";
export const originContact = "";
export const patternNextJSContact = "/contact/[target]/[topic]/[region]/[optional]/[optionalEnum]";
export type PathParamsContact = {
  target: "us" | "you";
  topic: string;
  region: "en";
  optional?: string;
  optionalEnum?: "enumOne" | "enumTwo";
};

export const possilePathParamsContact = ["target", "topic", "region", "optional", "optionalEnum"];
export interface UrlPartsContact {
  path: PathParamsContact;
  query?: Record<string, string | undefined>;
  origin?: string;
}
