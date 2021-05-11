/* This file was automatically generated with route-codegen and should not be edited. */
import { useRouter } from "next/router";
import { PathParamsContact } from "./patternContact";

export const useParamsContact = (): PathParamsContact => {
  const query = useRouter().query;
  return {
    target: (() => {
      const targetPossibleValues = ["us", "you"];
      if (targetPossibleValues.findIndex((v) => v === query.target) === -1) {
        throw new Error("Unable to match 'target' with expected enums");
      }
      return query.target as PathParamsContact["target"];
    })(),
    topic: query.topic as PathParamsContact["topic"],
    region: (() => {
      const regionPossibleValues = ["en"];
      if (regionPossibleValues.findIndex((v) => v === query.region) === -1) {
        throw new Error("Unable to match 'region' with expected enums");
      }
      return query.region as PathParamsContact["region"];
    })(),
    optional: query.optional ? (query.optional as PathParamsContact["optional"]) : undefined,
    optionalEnum: (() => {
      const optionalEnumPossibleValues = ["enumOne", "enumTwo", undefined];
      if (optionalEnumPossibleValues.findIndex((v) => v === query.optionalEnum) === -1) {
        throw new Error("Unable to match 'optionalEnum' with expected enums");
      }
      return query.optionalEnum as PathParamsContact["optionalEnum"];
    })(),
  };
};
