import { Key } from "path-to-regexp";

const isOptional = (key: Key): boolean => {
  return key.modifier === "?";
};

export default isOptional;
