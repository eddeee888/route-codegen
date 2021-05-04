/* This file was automatically generated with route-codegen and should not be edited. */
import { useRouter } from "next/router";

interface PathParamsNextJSAbout {
  target: string | string[];
  topic: string | string[];
  region: string | string[];
  optional?: string | string[];
  optionalEnum?: string | string[];
}
export const useParamsAbout = (): PathParamsNextJSAbout => {
  const query = useRouter().query;
  return {
    target: query.target ?? "",
    topic: query.topic ?? "",
    region: query.region ?? "",
    optional: query.optional ? query.optional : undefined,
    optionalEnum: query.optionalEnum ? query.optionalEnum : undefined,
  };
};
