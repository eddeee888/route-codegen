import generateLinkFile from './generateLinkFile';
import { RoutingType } from '../config';

describe('generateLinkFile', () => {
  describe('ReactRouterV5', () => {
    it('should generate correctly if no dynamic path', () => {
      const templateFile = generateLinkFile({
        importGenerateUrl: { namedImports: [{ name: 'generateUrl' }], from: 'route-codegen' },
        routingType: RoutingType.ReactRouterV5,
        routeLinkOptions: {
          ReactRouterV5: {
            path: 'react-router-dom',
            hrefProp: 'to',
            propsInterfaceName: 'LinkProps',
            useRedirect: true,
            useParams: true,
          },
          Default: {
            shouldGenerateDefault: true,
          },
          NextJS: {
            shouldGenerateDefault: true,
          },
        },
        routeName: 'Login',
        routePatternNamedExports: {
          filename: 'patternLogin',
          pathPatternName: 'patternLogin',
          urlPartsInterfaceName: 'UrlPartsLogin',
        },
        destinationDir: 'path/to/routes',
      });

      expect(templateFile.filename).toBe('LinkLogin');
      expect(templateFile.extension).toBe('.tsx');
      expect(templateFile.destinationDir).toBe('path/to/routes');
      expect(templateFile.template).toContain(`import React from 'react'
  import {generateUrl,} from 'route-codegen'
  import Link, {LinkProps as OriginalLinkProps,} from 'react-router-dom'
  import {patternLogin,} from './patternLogin'
  type LinkProps = Omit<OriginalLinkProps, 'to'>;
  const LinkLogin: LinkProps = ({  urlQuery, ...props }) => {
    const to = generateUrl(patternLogin, {}, urlQuery);
    return <Link {...props} to={to} />;
  }
  export default LinkLogin;`);
    });

    it('should generate correctly with dynamic path', () => {
      const templateFile = generateLinkFile({
        importGenerateUrl: { namedImports: [{ name: 'generateUrl' }], from: 'route-codegen' },
        routingType: RoutingType.ReactRouterV5,
        routeLinkOptions: {
          ReactRouterV5: {
            path: 'react-router-dom',
            hrefProp: 'to',
            propsInterfaceName: 'LinkProps',
            useRedirect: true,
            useParams: true,
          },
          Default: {
            shouldGenerateDefault: true,
          },
          NextJS: {
            shouldGenerateDefault: true,
          },
        },
        routeName: 'UserInfo',
        routePatternNamedExports: {
          filename: 'patternUserInfo',
          pathPatternName: 'patternUserInfo',
          pathParamsInterfaceName: 'PathParamsUserInfo',
          urlPartsInterfaceName: 'UrlPartsUserInfo',
        },
        destinationDir: 'path/to/routes',
      });

      expect(templateFile.filename).toBe('LinkUserInfo');
      expect(templateFile.extension).toBe('.tsx');
      expect(templateFile.destinationDir).toBe('path/to/routes');
      expect(templateFile.template).toContain(`import React from 'react'
  import {generateUrl,} from 'route-codegen'
  import Link, {LinkProps as OriginalLinkProps,} from 'react-router-dom'
  import {patternUserInfo,} from './patternUserInfo'
  type LinkProps = Omit<OriginalLinkProps, 'to'>;
  const LinkUserInfo: LinkProps = ({ path, urlQuery, ...props }) => {
    const to = generateUrl(patternUserInfo, path, urlQuery);
    return <Link {...props} to={to} />;
  }
  export default LinkUserInfo;`);
    });
  });
});
