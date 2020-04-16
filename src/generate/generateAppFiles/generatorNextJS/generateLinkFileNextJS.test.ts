import generateLinkFileNextJS, { GenerateLinkFileNextJSParams } from './generateLinkFileNextJS';
import { RoutingType } from '../../config';

describe('generateLinkFileNextJS', () => {
  const defaultParams: GenerateLinkFileNextJSParams = {
    importGenerateUrl: { namedImports: [{ name: 'generateUrl' }], from: 'route-codegen' },
    routeLinkOption: {
      importLink: {
        from: 'src/NextJS/Link',
        defaultImport: 'Link',
        namedImports: [{ name: 'NextJSLinkProps' }],
      },
      hrefProp: 'customHref',
      linkComponent: 'Link',
      linkProps: 'NextJSLinkProps',
      useParams: true,
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

  describe('NextJS', () => {
    it('should generate correctly if no path params', () => {
      const templateFile = generateLinkFileNextJS({ ...defaultParams });

      expect(templateFile.filename).toBe('LinkLogin');
      expect(templateFile.extension).toBe('.tsx');
      expect(templateFile.destinationDir).toBe('path/to/routes');
      expect(templateFile.template).toContain(`import React from 'react'
  import {generateUrl,} from 'route-codegen'
  import Link, {NextJSLinkProps,} from 'src/NextJS/Link'
  import {patternLogin,UrlPartsLogin,patternNextJSLogin,} from './patternLogin'
  type LinkLoginProps = Omit<NextJSLinkProps, 'customHref'> & UrlPartsLogin
  const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({  urlQuery, ...props }) => {
    const to = generateUrl(patternLogin, {}, urlQuery);
    return <Link {...props} customHref={patternNextJSLogin} as={to} />;
  }
  export default LinkLogin;`);
    });

    it('should generate correctly with path params', () => {
      const templateFile = generateLinkFileNextJS({
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
  import Link, {NextJSLinkProps,} from 'src/NextJS/Link'
  import {patternLogin,UrlPartsLogin,patternNextJSLogin,} from './patternLogin'
  type LinkLoginProps = Omit<NextJSLinkProps, 'customHref'> & UrlPartsLogin
  const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({ path, urlQuery, ...props }) => {
    const to = generateUrl(patternLogin, path, urlQuery);
    return <Link {...props} customHref={patternNextJSLogin} as={to} />;
  }
  export default LinkLogin;`);
    });

    it('should generate correctly with named component import', () => {
      const templateFile = generateLinkFileNextJS({
        ...defaultParams,
        routeLinkOption: {
          importLink: {
            from: 'src/common/Link',
            namedImports: [{ name: 'CustomLinkProps' }, { name: 'CustomLink', importAs: 'Link' }],
          },
          linkComponent: 'Link',
          linkProps: 'CustomLinkProps',
          hrefProp: 'to',
          useParams: true,
        },
      });

      expect(templateFile.filename).toBe('LinkLogin');
      expect(templateFile.extension).toBe('.tsx');
      expect(templateFile.destinationDir).toBe('path/to/routes');
      expect(templateFile.template).toContain(`import React from 'react'
  import {generateUrl,} from 'route-codegen'
  import {CustomLinkProps,CustomLink as Link,} from 'src/common/Link'
  import {patternLogin,UrlPartsLogin,patternNextJSLogin,} from './patternLogin'
  type LinkLoginProps = Omit<CustomLinkProps, 'to'> & UrlPartsLogin
  const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({  urlQuery, ...props }) => {
    const to = generateUrl(patternLogin, {}, urlQuery);
    return <Link {...props} to={patternNextJSLogin} as={to} />;
  }
  export default LinkLogin;`);
    });

    it('should throw error if no patternNameNextJS', () => {
      expect(() =>
        generateLinkFileNextJS({
          ...defaultParams,
          routeLinkOption: {
            importLink: {
              from: 'src/common/Link',
              namedImports: [{ name: 'CustomLinkProps' }, { name: 'CustomLink', importAs: 'Link' }],
            },
            linkComponent: 'Link',
            linkProps: 'CustomLinkProps',
            hrefProp: 'to',
            useParams: true,
          },
          patternNamedExports: {
            ...defaultParams.patternNamedExports,
            patternNameNextJS: undefined,
          },
        })
      ).toThrowError('[ERROR] Missing "patternNameNextJS". This is most likely a problem with route-codegen.');
    });
  });
});
