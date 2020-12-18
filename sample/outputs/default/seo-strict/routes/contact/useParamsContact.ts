/* This file was automatically generated with route-codegen and should not be edited. */
import { PathParamsContact } from "./patternContact";
import { useRouter } from "next/router";
const useParamsContact = (): PathParamsContact => {
  const query = useRouter().query;
  return {
    target: (() => {
      const targetPossibleValues = ["us", "you"];
      if (targetPossibleValues.findIndex((v) => v === query.target) === -1) {
        throw new Error("Unable to match 'target' with its enum values");
      }
      return query.target as PathParamsContact["target"];
    })(),
    topic: query.topic as PathParamsContact["topic"],
    optional: query.optional ? (query.optional as PathParamsContact["optional"]) : undefined,
    optionalEnum: (() => {
      const optionalEnumPossibleValues = ["enumOne", "enumTwo", undefined];
      if (optionalEnumPossibleValues.findIndex((v) => v === query.optionalEnum) === -1) {
        throw new Error("Unable to match 'optionalEnum' with its enum values");
      }
      return query.optionalEnum as PathParamsContact["optionalEnum"];
    })(),
  };
};
export default useParamsContact;
