import { Key } from 'path-to-regexp';

const isEnumKey = (key: Key): boolean => {
  return key.pattern.includes('|');
};

export default isEnumKey;
