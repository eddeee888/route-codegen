import generateRouteTemplate, { GenerateRouteTemplateOptions } from './generateRouteTemplate';
import { RoutingType } from '../config';

describe('generateRouteTemplate', () => {
  describe('react-router V5', () => {
    const options: GenerateRouteTemplateOptions = {
      routePattern: '/app/users/:id/:subview?(profile|pictures)',
      routingType: RoutingType.ReactRouter,
      shouldGenerateLink: true,
      shouldGenerateReactRouterFunctions: true,
      displayRouteName: 'RouteToUser',
      generateUrlFunctionPath: 'route-codegen',
      keys: [
        {
          name: 'id',
          prefix: '/',
          suffix: '',
          pattern: '[^\\/#\\?]+?',
          modifier: '',
        },
        {
          name: 'subview',
          prefix: '/',
          suffix: '',
          pattern: 'profile|pictures',
          modifier: '?',
        },
      ],
      routeLinkOptions: {
        ReactRouter: {
          shouldGenerateDefault: true,
        },
        Default: {
          shouldGenerateDefault: true,
        },
        NextJS: {
          shouldGenerateDefault: true,
        },
      },
    };
    it('should generate with default options', () => {
      const template = generateRouteTemplate({ ...options });

      expect(template).toContain(`import { generateUrl } from 'route-codegen';`);
      expect(template).toContain(`import React from 'react';`);
      expect(template).toContain(`import { Link, LinkProps as OriginalLinkProps } from 'react-router-dom';`);
      expect(template).toContain(`import { useRouteMatch, useHistory, } from 'react-router';`);
      expect(template).toContain(`const pattern = '/app/users/:id/:subview?(profile|pictures)';`);
      expect(template).toContain(`export interface RouteToUserPathParams {id: string;subview?:'profile'|'pictures';}`);
      expect(template).toContain(`type OmittedLinkProps = Omit<OriginalLinkProps, 'to'>;`);
      expect(template).toContain(`interface UrlParts<P> { path: P; urlQuery?: Partial<Record<string, string>>; }`);
      expect(template).toContain(`type RouteLinkProps<P> = OmittedLinkProps & UrlParts<P>;`);
      expect(template).toContain(
        `interface ReactRouterRoute<P> { pattern: string; generate: (urlParts: UrlParts<P>) => string; Link: React.FunctionComponent<RouteLinkProps<P>>; useParams: () => P; useRedirect: (urlParts: UrlParts<P>) => () => void; }`
      );
      expect(template).toContain(`const RouteToUser: ReactRouterRoute<RouteToUserPathParams> = {
    pattern,
    generate: ({ path, urlQuery }) => generateUrl(pattern, path, urlQuery),
    Link: function RouteLink({ path, urlQuery, ...props }) {
      const to = generateUrl(pattern, path, urlQuery);
      return <Link {...props} to={to} />;
    },
    useParams: () => {
      const { path, params } = useRouteMatch<RouteToUserPathParams>();
  
      if (path !== pattern) {
        const error = \`You are trying to use useParams for "${'${pattern}'}" in "${'${path}'}". Make sure you are using the right route link object!\`;
        throw new Error(error);
      }
  
      return params;
    },
    useRedirect: ({ path, urlQuery }) => {
      const history = useHistory();
      const to = generateUrl(pattern, path, urlQuery);
      return () => history.push(to);
    },
  };
`);
      expect(template).toContain(`export default RouteToUser;`);
    });
  });
});
