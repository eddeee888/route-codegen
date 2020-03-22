import generateRouteTemplate, { GenerateRouteTemplateOptions } from './generateRouteTemplate';
import { RoutingType } from '../config';

describe('generateRouteTemplate', () => {
  describe('react-router V5', () => {
    const options: GenerateRouteTemplateOptions = {
      routingType: RoutingType.ReactRouter,
      routePatternNamedExports: {
        filename: 'patternUser',
        pathPatternName: 'patternUser',
        pathParamsInterfaceName: 'UserPathParams',
      },
      shouldGenerateLink: true,
      shouldGenerateReactRouterFunctions: true,
      displayRouteName: 'RouteToUser',
      generateUrlFunctionPath: 'route-codegen',
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
      expect(template).toContain(`import  {patternUser as pattern,UserPathParams,} from './patternUser'`);
      expect(template).toContain(`type OmittedLinkProps = Omit<OriginalLinkProps, 'to'>;`);
      expect(template).toContain(`interface UrlParts<P> { path: P; urlQuery?: Partial<Record<string, string>>; }`);
      expect(template).toContain(`type RouteLinkProps<P> = OmittedLinkProps & UrlParts<P>;`);
      expect(template).toContain(
        `interface ReactRouterRoute<P> { pattern: string; generate: (urlParts: UrlParts<P>) => string; Link: React.FunctionComponent<RouteLinkProps<P>>; useParams: () => P; useRedirect: (urlParts: UrlParts<P>) => () => void; }`
      );
      expect(template).toContain(`const RouteToUser: ReactRouterRoute<UserPathParams> = {
    pattern,
    generate: ({ path, urlQuery }) => generateUrl(pattern, path, urlQuery),
    Link: function RouteLink({ path, urlQuery, ...props }) {
      const to = generateUrl(pattern, path, urlQuery);
      return <Link {...props} to={to} />;
    },
    useParams: () => {
      const { path, params } = useRouteMatch<UserPathParams>();
  
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

    it('should generate with custom links', () => {
      const template = generateRouteTemplate({
        ...options,
        routeLinkOptions: {
          ...options.routeLinkOptions,
          ReactRouter: {
            shouldGenerateDefault: false,
            hrefProp: 'someHrefProp',
            path: 'path-to-custom-link',
            propsInterfaceName: 'CustomLinkProps',
          },
        },
      });

      expect(template).toContain(`import { generateUrl } from 'route-codegen';`);
      expect(template).toContain(`import React from 'react';`);
      expect(template).toContain(`import Link, { CustomLinkProps as OriginalLinkProps } from 'path-to-custom-link'`);
      expect(template).toContain(`import { useRouteMatch, useHistory, } from 'react-router';`);
      expect(template).toContain(`import  {patternUser as pattern,UserPathParams,} from './patternUser'`);
      expect(template).toContain(`type OmittedLinkProps = Omit<OriginalLinkProps, 'someHrefProp'>;`);
      expect(template).toContain(`interface UrlParts<P> { path: P; urlQuery?: Partial<Record<string, string>>; }`);
      expect(template).toContain(`type RouteLinkProps<P> = OmittedLinkProps & UrlParts<P>;`);
      expect(template).toContain(
        `interface ReactRouterRoute<P> { pattern: string; generate: (urlParts: UrlParts<P>) => string; Link: React.FunctionComponent<RouteLinkProps<P>>; useParams: () => P; useRedirect: (urlParts: UrlParts<P>) => () => void; }`
      );
      expect(template).toContain(`const RouteToUser: ReactRouterRoute<UserPathParams> = {
    pattern,
    generate: ({ path, urlQuery }) => generateUrl(pattern, path, urlQuery),
    Link: function RouteLink({ path, urlQuery, ...props }) {
      const to = generateUrl(pattern, path, urlQuery);
      return <Link {...props} someHrefProp={to} />;
    },
    useParams: () => {
      const { path, params } = useRouteMatch<UserPathParams>();
  
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

    it('should generate without react-router helper functions', () => {
      const template = generateRouteTemplate({ ...options, shouldGenerateReactRouterFunctions: false });

      expect(template).toContain(`import { generateUrl } from 'route-codegen';`);
      expect(template).toContain(`import React from 'react';`);
      expect(template).toContain(`import { Link, LinkProps as OriginalLinkProps } from 'react-router-dom';`);
      expect(template).not.toContain(`import { useRouteMatch, useHistory, } from 'react-router';`);
      expect(template).toContain(`import  {patternUser as pattern,UserPathParams,} from './patternUser'`);
      expect(template).toContain(`type OmittedLinkProps = Omit<OriginalLinkProps, 'to'>;`);
      expect(template).toContain(`interface UrlParts<P> { path: P; urlQuery?: Partial<Record<string, string>>; }`);
      expect(template).toContain(`type RouteLinkProps<P> = OmittedLinkProps & UrlParts<P>;`);
      expect(template).toContain(
        `interface ReactRouterRoute<P> { pattern: string; generate: (urlParts: UrlParts<P>) => string; Link: React.FunctionComponent<RouteLinkProps<P>>;   }`
      );
      expect(template).toContain(`const RouteToUser: ReactRouterRoute<UserPathParams> = {
    pattern,
    generate: ({ path, urlQuery }) => generateUrl(pattern, path, urlQuery),
    Link: function RouteLink({ path, urlQuery, ...props }) {
      const to = generateUrl(pattern, path, urlQuery);
      return <Link {...props} to={to} />;
    },`);
      expect(template).toContain(`export default RouteToUser;`);
    });

    it('should generate if no path param interface', () => {
      const template = generateRouteTemplate({
        ...options,
        routePatternNamedExports: {
          filename: 'patternUser',
          pathPatternName: 'patternUser',
        },
      });

      expect(template).toContain('generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),');
      expect(template).toContain(`Link: function RouteLink({ urlQuery, ...props }) {
      const to = generateUrl(pattern, {}, urlQuery);`);
      expect(template).toContain(`useRedirect: ({ urlQuery }) => {
    const history = useHistory();
    const to = generateUrl(pattern, {}, urlQuery);
    return () => history.push(to);
  }`);
    });
  });

  describe('NextJS', () => {
    const options: GenerateRouteTemplateOptions = {
      routePatternNamedExports: {
        filename: 'patternUser',
        pathPatternName: 'patternUser',
        pathParamsInterfaceName: 'UserPathParams',
      },
      routingType: RoutingType.NextJS,
      shouldGenerateLink: true,
      shouldGenerateReactRouterFunctions: false,
      displayRouteName: 'RouteToUser',
      generateUrlFunctionPath: 'route-codegen',
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
      expect(template).toContain(`import Link, { LinkProps as OriginalLinkProps } from 'next/link';`);
      expect(template).toContain(`import  {patternUser as pattern,UserPathParams,} from './patternUser'`);
      expect(template).toContain(`type OmittedLinkProps = Omit<OriginalLinkProps, 'href'>;`);
      expect(template).toContain(`interface UrlParts<P> { path: P; urlQuery?: Partial<Record<string, string>>; }`);
      expect(template).toContain(`type RouteLinkProps<P> = OmittedLinkProps & UrlParts<P>;`);
      expect(template).toContain(
        `interface NextJSRoute<P> { pattern: string; generate: (urlParts: UrlParts<P>) => string; Link: React.FunctionComponent<RouteLinkProps<P>>;`
      );
      expect(template).toContain(`const RouteToUser: NextJSRoute<UserPathParams> = {
    pattern,
    generate: ({ path, urlQuery }) => generateUrl(pattern, path, urlQuery),
    Link: function RouteLink({ path, urlQuery, ...props }) {
      const to = generateUrl(pattern, path, urlQuery);
      return <Link {...props} href={to} />;
    },`);
    });

    it('should generate with custom route options', () => {
      const template = generateRouteTemplate({
        ...options,
        routeLinkOptions: {
          ...options.routeLinkOptions,
          NextJS: {
            shouldGenerateDefault: false,
            hrefProp: 'someHrefProp',
            path: 'path-to-custom-link',
            propsInterfaceName: 'CustomLinkProps',
          },
        },
      });

      expect(template).toContain(`import { generateUrl } from 'route-codegen';`);
      expect(template).toContain(`import React from 'react';`);
      expect(template).toContain(`import Link, { CustomLinkProps as OriginalLinkProps } from 'path-to-custom-link'`);
      expect(template).toContain(`import  {patternUser as pattern,UserPathParams,} from './patternUser'`);
      expect(template).toContain(`type OmittedLinkProps = Omit<OriginalLinkProps, 'someHrefProp'>;`);
      expect(template).toContain(`interface UrlParts<P> { path: P; urlQuery?: Partial<Record<string, string>>; }`);
      expect(template).toContain(`type RouteLinkProps<P> = OmittedLinkProps & UrlParts<P>;`);
      expect(template).toContain(
        `interface NextJSRoute<P> { pattern: string; generate: (urlParts: UrlParts<P>) => string; Link: React.FunctionComponent<RouteLinkProps<P>>;`
      );
      expect(template).toContain(`const RouteToUser: NextJSRoute<UserPathParams> = {
    pattern,
    generate: ({ path, urlQuery }) => generateUrl(pattern, path, urlQuery),
    Link: function RouteLink({ path, urlQuery, ...props }) {
      const to = generateUrl(pattern, path, urlQuery);
      return <Link {...props} someHrefProp={to} />;
    },`);
    });

    it('should generate if no dynamic path params', () => {
      const template = generateRouteTemplate({
        ...options,
        routePatternNamedExports: {
          filename: 'patternLogin',
          pathPatternName: 'patternLogin',
        },
      });

      expect(template).toContain('generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),');
      expect(template).toContain(`Link: function RouteLink({ urlQuery, ...props }) {
      const to = generateUrl(pattern, {}, urlQuery);`);
    });
  });

  describe('Default / External links', () => {
    const options: GenerateRouteTemplateOptions = {
      routePatternNamedExports: {
        filename: 'patternUser',
        pathPatternName: 'patternUser',
        pathParamsInterfaceName: 'UserPathParams',
      },
      routingType: RoutingType.Default,
      shouldGenerateLink: true,
      shouldGenerateReactRouterFunctions: false,
      displayRouteName: 'RouteToUser',
      generateUrlFunctionPath: 'route-codegen',
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
      expect(template).toContain(`import  {patternUser as pattern,UserPathParams,} from './patternUser'`);
      expect(template).toContain(
        `type OmittedLinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, 'href'>;`
      );
      expect(template).toContain(`interface UrlParts<P> { path: P; urlQuery?: Partial<Record<string, string>>; }`);
      expect(template).toContain(`type RouteLinkProps<P> = OmittedLinkProps & UrlParts<P>;`);
      expect(template).toContain(
        `interface DefaultRoute<P> { pattern: string; generate: (urlParts: UrlParts<P>) => string; Link: React.FunctionComponent<RouteLinkProps<P>>;   }`
      );
      expect(template).toContain(`const RouteToUser: DefaultRoute<UserPathParams> = {
    pattern,
    generate: ({ path, urlQuery }) => generateUrl(pattern, path, urlQuery),
    Link: function RouteLink({ path, urlQuery, ...props }) {
      const to = generateUrl(pattern, path, urlQuery);
      return <a {...props} href={to} />;
    },`);
      expect(template).toContain(`export default RouteToUser;`);
    });

    it('should generate with custom options', () => {
      const template = generateRouteTemplate({
        ...options,
        routeLinkOptions: {
          ...options.routeLinkOptions,
          Default: {
            shouldGenerateDefault: false,
            hrefProp: 'someHrefProp',
            path: 'path-to-custom-link',
            propsInterfaceName: 'CustomLinkProps',
          },
        },
      });

      expect(template).toContain(`import { generateUrl } from 'route-codegen';`);
      expect(template).toContain(`import React from 'react';`);
      expect(template).toContain(`import Link, { CustomLinkProps as OriginalLinkProps } from 'path-to-custom-link'`);
      expect(template).toContain(`import  {patternUser as pattern,UserPathParams,} from './patternUser'`);
      expect(template).toContain(`type OmittedLinkProps = Omit<OriginalLinkProps, 'someHrefProp'>;`);
      expect(template).toContain(`interface UrlParts<P> { path: P; urlQuery?: Partial<Record<string, string>>; }`);
      expect(template).toContain(`type RouteLinkProps<P> = OmittedLinkProps & UrlParts<P>;`);
      expect(template).toContain(
        `interface DefaultRoute<P> { pattern: string; generate: (urlParts: UrlParts<P>) => string; Link: React.FunctionComponent<RouteLinkProps<P>>;   }`
      );
      expect(template).toContain(`const RouteToUser: DefaultRoute<UserPathParams> = {
    pattern,
    generate: ({ path, urlQuery }) => generateUrl(pattern, path, urlQuery),
    Link: function RouteLink({ path, urlQuery, ...props }) {
      const to = generateUrl(pattern, path, urlQuery);
      return <Link {...props} someHrefProp={to} />;
    },`);
      expect(template).toContain(`export default RouteToUser;`);
    });

    it('should generate if no dynamic path params', () => {
      const template = generateRouteTemplate({
        ...options,
        routePatternNamedExports: {
          filename: 'patternLogin',
          pathPatternName: 'patternLogin',
        },
      });

      expect(template).toContain('generate: ({ urlQuery }) => generateUrl(pattern, {}, urlQuery),');
      expect(template).toContain(`Link: function RouteLink({ urlQuery, ...props }) {
      const to = generateUrl(pattern, {}, urlQuery);`);
    });
  });
});
