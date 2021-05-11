/* This file was automatically generated with route-codegen and should not be edited. */
import { PathParamsUser } from "./patternUser";
import { useRouteMatch } from "react-router";
export const useParamsUser = (): PathParamsUser => {
  return useRouteMatch<PathParamsUser>().params;
};
