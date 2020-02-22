import { Link, LinkProps as ReactRouterLinkProps, generatePath } from 'react-router-dom';

export interface LinkProps<P> extends Omit<ReactRouterLinkProps, 'to'> {
  params: P;
}

function createReactRouterLink<P = {}>(pattern: string) {
  return function RouteLink({ params, ...props }: LinkProps<P>): any {
    const to = generatePath(pattern, params as any);
    return <Link {...props} to={to} />;
  };
}

export default createReactRouterLink;
