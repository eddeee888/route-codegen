/* This file was automatically generated with route-codegen and should not be edited. */
import { PathParamsNextJSAbout } from "./patternAbout";
import { useRouter } from "next/router";
const useParamsAbout = (): PathParamsNextJSAbout => {
  const query = useRouter().query;
  return {
    target: query.target as string,
    topic: query.topic as string,
    optional: query.optional ? (query.optional as string) : undefined,
    optionalEnum: query.optionalEnum ? (query.optionalEnum as string) : undefined,
  };
};
export default useParamsAbout;
