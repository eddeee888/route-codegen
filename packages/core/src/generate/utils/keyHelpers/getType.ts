import { Key } from "path-to-regexp";

export enum KeyType {
  "normal" = "normal",
  "enum" = "enum",
}

const NORMAL_PATTERN = "[^\\/#\\?]+?";

const getType = (key: Key): KeyType => {
  if (key.pattern === NORMAL_PATTERN) {
    return KeyType.normal;
  }

  // TODO: Falling back to enum might not be safe...
  return KeyType.enum;
};

export default getType;
