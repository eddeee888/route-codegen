import generateLinkFileDefault, { GenerateLinkFileDefaultParams } from './generateLinkFileDefault';

describe('generateLinkFileDefault', () => {
  const defaultParams: GenerateLinkFileDefaultParams = {
    importGenerateUrl: { namedImports: [{ name: 'generateUrl' }], from: 'route-codegen' },
    routeLinkOption: {
      hrefProp: 'href',
      linkComponent: 'a',
      inlineLinkProps: {
        template: `type InlineLinkProps = Omit<React.SomeReallyLongReactHTMLProps, 'href'>`,
        linkProps: 'InlineLinkProps',
      },
      useRedirect: true,
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

  describe('Default anchor', () => {
    it('should generate correctly with custom interface and no path params', () => {
      const templateFile = generateLinkFileDefault({
        ...defaultParams,
        routeLinkOption: {
          importLink: {
            from: 'src/Default/Link',
            defaultImport: 'Link',
            namedImports: [{ name: 'CustomLinkProps' }],
          },
          hrefProp: 'customDefaultHref',
          linkComponent: 'Link',
          linkProps: 'CustomLinkProps',
          useRedirect: true,
        },
      });

      expect(templateFile.filename).toBe('LinkLogin');
      expect(templateFile.extension).toBe('.tsx');
      expect(templateFile.destinationDir).toBe('path/to/routes');
      expect(templateFile.template).toContain(`import React from 'react'
  import {generateUrl,} from 'route-codegen'
  import Link, {CustomLinkProps,} from 'src/Default/Link'
  import {patternLogin,UrlPartsLogin,} from './patternLogin'
  type LinkLoginProps = Omit<CustomLinkProps, 'customDefaultHref'> & UrlPartsLogin
  const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({  urlQuery, ...props }) => {
    const to = generateUrl(patternLogin, {}, urlQuery);
    return <Link {...props} customDefaultHref={to} />;
  }
  export default LinkLogin;`);
    });

    it('should generate correctly with inline interface and no path params', () => {
      const templateFile = generateLinkFileDefault({ ...defaultParams });

      expect(templateFile.filename).toBe('LinkLogin');
      expect(templateFile.extension).toBe('.tsx');
      expect(templateFile.destinationDir).toBe('path/to/routes');
      expect(templateFile.template).toContain(`import React from 'react'
  import {generateUrl,} from 'route-codegen'
  
  import {patternLogin,UrlPartsLogin,} from './patternLogin'
  type InlineLinkProps = Omit<React.SomeReallyLongReactHTMLProps, 'href'> & UrlPartsLogin
  const LinkLogin: React.FunctionComponent<InlineLinkProps> = ({  urlQuery, ...props }) => {
    const to = generateUrl(patternLogin, {}, urlQuery);
    return <a {...props} href={to} />;
  }
  export default LinkLogin;`);
    });

    it('should generate correctly with inline interface and path params', () => {
      const templateFile = generateLinkFileDefault({
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
  
  import {patternLogin,UrlPartsLogin,} from './patternLogin'
  type InlineLinkProps = Omit<React.SomeReallyLongReactHTMLProps, 'href'> & UrlPartsLogin
  const LinkLogin: React.FunctionComponent<InlineLinkProps> = ({ path, urlQuery, ...props }) => {
    const to = generateUrl(patternLogin, path, urlQuery);
    return <a {...props} href={to} />;
  }
  export default LinkLogin;`);
    });

    it('should generate correctly with named component import', () => {
      const templateFile = generateLinkFileDefault({
        ...defaultParams,
        routeLinkOption: {
          importLink: {
            from: 'src/common/Link',
            namedImports: [{ name: 'CustomLinkProps' }, { name: 'CustomLink', importAs: 'Link' }],
          },
          linkComponent: 'Link',
          linkProps: 'CustomLinkProps',
          hrefProp: 'to',
          useRedirect: true,
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
