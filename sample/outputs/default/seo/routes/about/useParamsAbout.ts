/* This file was automatically generated with route-codegen and should not be edited. */
import { PathParamsNextJSAbout } from "./patternAbout";
import { useRouter } from "next/router";
const useParamsAbout = (): PathParamsNextJSAbout => {
  const query = useRouter().query;
  return {
    target: query.target,
    topic: query.topic,
    region: query.region,
    optional: query.optional ? query.optional : undefined,
    optionalEnum: query.optionalEnum ? query.optionalEnum : undefined,
  };
};
export default useParamsAbout;
