// TODO: fix this hacky compare
const NORMAL_PATTERN = '[^\\/#\\?]+?';

const isNormalPattern = (pattern: string): boolean => {
  return pattern === NORMAL_PATTERN;
};

export default isNormalPattern;
