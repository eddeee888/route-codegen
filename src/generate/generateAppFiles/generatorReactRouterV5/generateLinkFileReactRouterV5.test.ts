import generateLinkFileReactRouterV5, { GenerateLinkFileReactRouterV5Params } from './generateLinkFileReactRouterV5';

describe('generateLinkFileReactRouterV5', () => {
  const defaultParams: GenerateLinkFileReactRouterV5Params = {
    importGenerateUrl: { namedImports: [{ name: 'generateUrl' }], from: 'route-codegen' },
    routeLinkOption: {
      importLink: {
        from: 'src/common/Link',
        defaultImport: 'Link',
        namedImports: [{ name: 'CustomLinkProps' }],
      },
      linkComponent: 'Link',
      linkProps: 'CustomLinkProps',
      hrefProp: 'to',
      generateLinkComponent: true,
      generateRedirectComponent: true,
      generateUseRedirect: true,
      generateUseParams: true,
    },
    routeName: 'Login',
    patternNamedExports: {
      filename: 'patternLogin',
      patternName: 'patternLogin',
      urlPartsInterfaceName: 'UrlPartsLogin',
      patternNameNextJS: 'patternNextJSLogin',
    },
    destinationDir: 'path/to/routes',
  };

  describe('ReactRouterV5', () => {
    it('should generate correctly if no path params', () => {
      const templateFile = generateLinkFileReactRouterV5({ ...defaultParams });

      expect(templateFile.filename).toBe('LinkLogin');
      expect(templateFile.extension).toBe('.tsx');
      expect(templateFile.destinationDir).toBe('path/to/routes');
      expect(templateFile.template).toContain(`import React from 'react'
  import {generateUrl,} from 'route-codegen'
  import Link, {CustomLinkProps,} from 'src/common/Link'
  import {patternLogin,UrlPartsLogin,} from './patternLogin'
  type LinkLoginProps = Omit<CustomLinkProps, 'to'> & UrlPartsLogin
  const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({  urlQuery, ...props }) => {
    const to = generateUrl(patternLogin, {}, urlQuery);
    return <Link {...props} to={to} />;
  }
  export default LinkLogin;`);
    });

    it('should generate correctly with path params', () => {
      const templateFile = generateLinkFileReactRouterV5({
        ...defaultParams,
        patternNamedExports: {
          ...defaultParams.patternNamedExports,
          pathParamsInterfaceName: 'PathParamsLogin',
        },
      });

      expect(templateFile.filename).toBe('LinkLogin');
      expect(templateFile.extension).toBe('.tsx');
      expect(templateFile.destinationDir).toBe('path/to/routes');
      expect(templateFile.template).toContain(`import React from 'react'
  import {generateUrl,} from 'route-codegen'
  import Link, {CustomLinkProps,} from 'src/common/Link'
  import {patternLogin,UrlPartsLogin,} from './patternLogin'
  type LinkLoginProps = Omit<CustomLinkProps, 'to'> & UrlPartsLogin
  const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({ path, urlQuery, ...props }) => {
    const to = generateUrl(patternLogin, path, urlQuery);
    return <Link {...props} to={to} />;
  }
  export default LinkLogin;`);
    });

    it('should generate correctly with named component import', () => {
      const templateFile = generateLinkFileReactRouterV5({
        ...defaultParams,
        routeLinkOption: {
          importLink: {
            from: 'src/common/Link',
            namedImports: [{ name: 'CustomLinkProps' }, { name: 'CustomLink', importAs: 'Link' }],
          },
          linkComponent: 'Link',
          linkProps: 'CustomLinkProps',
          hrefProp: 'to',
          generateLinkComponent: true,
          generateRedirectComponent: true,
          generateUseRedirect: true,
          generateUseParams: true,
        },
      });

      expect(templateFile.filename).toBe('LinkLogin');
      expect(templateFile.extension).toBe('.tsx');
      expect(templateFile.destinationDir).toBe('path/to/routes');
      expect(templateFile.template).toContain(`import React from 'react'
  import {generateUrl,} from 'route-codegen'
  import {CustomLinkProps,CustomLink as Link,} from 'src/common/Link'
  import {patternLogin,UrlPartsLogin,} from './patternLogin'
  type LinkLoginProps = Omit<CustomLinkProps, 'to'> & UrlPartsLogin
  const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({  urlQuery, ...props }) => {
    const to = generateUrl(patternLogin, {}, urlQuery);
    return <Link {...props} to={to} />;
  }
  export default LinkLogin;`);
    });
  });
});
