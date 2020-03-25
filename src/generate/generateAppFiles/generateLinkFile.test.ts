import generateLinkFile, { GenerateLinkFileParams } from './generateLinkFile';
import { RoutingType } from '../config';

describe('generateLinkFile', () => {
  const defaultParams: GenerateLinkFileParams = {
    importGenerateUrl: { namedImports: [{ name: 'generateUrl' }], from: 'route-codegen' },
    routingType: RoutingType.ReactRouterV5,
    routeLinkOptions: {
      ReactRouterV5: {
        path: 'src/common/Link',
        hrefProp: 'to',
        propsInterfaceName: 'CustomLinkProps',
        useRedirect: true,
        useParams: true,
      },
      Default: {
        shouldGenerateDefault: true,
      },
      NextJS: {
        path: 'src/NextJS/Link',
        hrefProp: 'customHref',
        propsInterfaceName: 'NextJSLinkProps',
      },
    },
    routeName: 'Login',
    routePatternNamedExports: {
      filename: 'patternLogin',
      pathPatternName: 'patternLogin',
      urlPartsInterfaceName: 'UrlPartsLogin',
    },
    destinationDir: 'path/to/routes',
  };

  describe('ReactRouterV5', () => {
    it('should generate correctly if no path params', () => {
      const templateFile = generateLinkFile({ ...defaultParams, routingType: RoutingType.ReactRouterV5 });

      expect(templateFile.filename).toBe('LinkLogin');
      expect(templateFile.extension).toBe('.tsx');
      expect(templateFile.destinationDir).toBe('path/to/routes');
      expect(templateFile.template).toContain(`import React from 'react'
  import {generateUrl,} from 'route-codegen'
  import Link, {CustomLinkProps as OriginalLinkProps,} from 'src/common/Link'
  import {patternLogin,} from './patternLogin'
  type LinkProps = Omit<OriginalLinkProps, 'to'>;
  const LinkLogin: LinkProps = ({  urlQuery, ...props }) => {
    const to = generateUrl(patternLogin, {}, urlQuery);
    return <Link {...props} to={to} />;
  }
  export default LinkLogin;`);
    });

    it('should generate correctly with path params', () => {
      const templateFile = generateLinkFile({
        ...defaultParams,
        routingType: RoutingType.ReactRouterV5,
        routePatternNamedExports: {
          ...defaultParams.routePatternNamedExports,
          pathParamsInterfaceName: 'PathParamsLogin',
        },
      });

      expect(templateFile.filename).toBe('LinkLogin');
      expect(templateFile.extension).toBe('.tsx');
      expect(templateFile.destinationDir).toBe('path/to/routes');
      expect(templateFile.template).toContain(`import React from 'react'
  import {generateUrl,} from 'route-codegen'
  import Link, {CustomLinkProps as OriginalLinkProps,} from 'src/common/Link'
  import {patternLogin,} from './patternLogin'
  type LinkProps = Omit<OriginalLinkProps, 'to'>;
  const LinkLogin: LinkProps = ({ path, urlQuery, ...props }) => {
    const to = generateUrl(patternLogin, path, urlQuery);
    return <Link {...props} to={to} />;
  }
  export default LinkLogin;`);
    });
  });

  describe('NextJS', () => {
    it('should generate correctly if no path params', () => {
      const templateFile = generateLinkFile({ ...defaultParams, routingType: RoutingType.NextJS });

      expect(templateFile.filename).toBe('LinkLogin');
      expect(templateFile.extension).toBe('.tsx');
      expect(templateFile.destinationDir).toBe('path/to/routes');
      expect(templateFile.template).toContain(`import React from 'react'
  import {generateUrl,} from 'route-codegen'
  import Link, {NextJSLinkProps as OriginalLinkProps,} from 'src/NextJS/Link'
  import {patternLogin,} from './patternLogin'
  type LinkProps = Omit<OriginalLinkProps, 'customHref'>;
  const LinkLogin: LinkProps = ({  urlQuery, ...props }) => {
    const to = generateUrl(patternLogin, {}, urlQuery);
    return <Link {...props} customHref={to} />;
  }
  export default LinkLogin;`);
    });

    it('should generate correctly with path params', () => {
      const templateFile = generateLinkFile({
        ...defaultParams,
        routingType: RoutingType.NextJS,
        routePatternNamedExports: {
          ...defaultParams.routePatternNamedExports,
          pathParamsInterfaceName: 'PathParamsLogin',
        },
      });

      expect(templateFile.filename).toBe('LinkLogin');
      expect(templateFile.extension).toBe('.tsx');
      expect(templateFile.destinationDir).toBe('path/to/routes');
      expect(templateFile.template).toContain(`import React from 'react'
  import {generateUrl,} from 'route-codegen'
  import Link, {NextJSLinkProps as OriginalLinkProps,} from 'src/NextJS/Link'
  import {patternLogin,} from './patternLogin'
  type LinkProps = Omit<OriginalLinkProps, 'customHref'>;
  const LinkLogin: LinkProps = ({ path, urlQuery, ...props }) => {
    const to = generateUrl(patternLogin, path, urlQuery);
    return <Link {...props} customHref={to} />;
  }
  export default LinkLogin;`);
    });
  });
});
