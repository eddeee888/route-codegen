/* This file was automatically generated with route-codegen and should not be edited. */
export const patternAbout = "/about/:target(us|you)/:topic/:region(en)/:optional?/:optionalEnum(enumOne|enumTwo)?";
export const originAbout = "";
/** Recommended file paths:
 * - "src/pages/about/[target]/[topic]/[region]/[optional]/[optionalEnum]/index.tsx"
 * - "pages/about/[target]/[topic]/[region]/[optional]/[optionalEnum]/index.tsx"
 */
export const patternNextJSAbout = "/about/[target]/[topic]/[region]/[optional]/[optionalEnum]";
export type PathParamsAbout = {
  target: "us" | "you";
  topic: string;
  region: "en";
  optional?: string;
  optionalEnum?: "enumOne" | "enumTwo";
};
export interface PathParamsNextJSAbout {
  target: string | string[];
  topic: string | string[];
  region: string | string[];
  optional?: string | string[];
  optionalEnum?: string | string[];
}
export const possilePathParamsAbout = ["target", "topic", "region", "optional", "optionalEnum"];
export interface UrlPartsAbout {
  path: PathParamsAbout;
  query?: Record<string, string | undefined>;
  origin?: string;
}
