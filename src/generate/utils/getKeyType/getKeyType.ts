import { Key } from 'path-to-regexp';

export enum KeyType {
  'normal' = 'normal',
  'enum' = 'enum',
}

const NORMAL_PATTERN = '[^\\/#\\?]+?';

const getKeyType = (key: Key): KeyType => {
  if (key.pattern === NORMAL_PATTERN) {
    return KeyType.normal;
  } else if (key.pattern.includes('|')) {
    return KeyType.enum;
  }

  throw new Error(`Unable to handle ${key.pattern}...`);
};

export default getKeyType;
