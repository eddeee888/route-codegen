import { generatePath } from 'react-router';
import LinkNext, { LinkProps as NextJSLinkProps } from 'next/link';

export interface LinkProps<P> extends Omit<NextJSLinkProps, 'href'> {
  params: P;
  children: React.ReactNode;
}

function createNextJSLink<P>(pattern: string) {
  return function NextJsLink({ params, children, ...props }: LinkProps<P>) {
    const to = generatePath(pattern, params as any);
    return (
      <LinkNext href={to} {...props}>
        <a>{children}</a>
      </LinkNext>
    );
  };
}

export default createNextJSLink;
