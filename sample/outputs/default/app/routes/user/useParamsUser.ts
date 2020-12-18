/* This file was automatically generated with route-codegen and should not be edited. */
import { PathParamsUser } from "./patternUser";
import { useRouteMatch } from "react-router";
const useParamsUser = (): PathParamsUser => {
  return useRouteMatch<PathParamsUser>().params;
};
export default useParamsUser;
