import { generatePath } from 'react-router';
import createLink, { LinkProps } from './createDefaultLink';

interface DefaultRoute<P> {
  pattern: string;
  generate: (inputParams: P) => string;
  Link: React.FunctionComponent<LinkProps<P>>;
}

function createDefaultRoute<P = {}>(pattern: string): DefaultRoute<P> {
  return {
    pattern,
    generate: params => generatePath(pattern, params as any),
    Link: createLink(pattern),
  };
}

export default createDefaultRoute;
