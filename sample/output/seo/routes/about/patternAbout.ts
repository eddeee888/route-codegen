/* This file was automatically generated with route-codegen and should not be edited. */
export const patternAbout = "/about/:target(us|you)/:topic/:optional?/:optionalEnum(enumOne|enumTwo)?";
export const patternNextJSAbout = "/about/[target]/[topic]/[optional]/[optionalEnum]";
export type PathParamsAbout = { target: "us" | "you"; topic: string; optional?: string; optionalEnum?: "enumOne" | "enumTwo" };
export interface PathParamsNextJSAbout {
  target: string;
  topic: string;
  optional?: string;
  optionalEnum?: string;
}
export const possilePathParamsAbout = ["target", "topic", "optional", "optionalEnum"];
export interface UrlPartsAbout {
  path: PathParamsAbout;
  urlQuery?: Record<string, string>;
}
