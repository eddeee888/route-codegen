/* This file was automatically generated with route-codegen and should not be edited. */
import { PathParamsNextJSAbout } from "./patternAbout";
import { useRouter } from "next/router";
const useParamsAbout = (): PathParamsNextJSAbout => {
  const query = useRouter().query;
  return {
    target: query.target as PathParamsNextJSAbout["target"],
    topic: query.topic as PathParamsNextJSAbout["topic"],
    optional: query.optional ? (query.optional as PathParamsNextJSAbout["optional"]) : undefined,
    optionalEnum: query.optionalEnum ? (query.optionalEnum as PathParamsNextJSAbout["optionalEnum"]) : undefined,
  };
};
export default useParamsAbout;
