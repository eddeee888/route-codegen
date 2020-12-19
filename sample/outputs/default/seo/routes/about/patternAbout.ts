/* This file was automatically generated with route-codegen and should not be edited. */
export const patternAbout = "/about/:target(us|you)/:topic/:region(en)/:optional?/:optionalEnum(enumOne|enumTwo)?";
export const originAbout = "";
export const patternNextJSAbout = "/about/[target]/[topic]/[region]/[optional]/[optionalEnum]";
export type PathParamsAbout = {
  target: "us" | "you";
  topic: string;
  region: "en";
  optional?: string;
  optionalEnum?: "enumOne" | "enumTwo";
};
export interface PathParamsNextJSAbout {
  target: string;
  topic: string;
  region: string;
  optional?: string;
  optionalEnum?: string;
}
export const possilePathParamsAbout = ["target", "topic", "region", "optional", "optionalEnum"];
export interface UrlPartsAbout {
  path: PathParamsAbout;
  query?: Record<string, string | undefined>;
  origin?: string;
}
