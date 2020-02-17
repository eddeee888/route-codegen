// TODO: fix this hacky compare
const NORMAL_PATTERN = '[^\\/#\\?]+?';

function isNormalPattern(pattern: string): boolean {
  return pattern === NORMAL_PATTERN;
}

export default isNormalPattern;
