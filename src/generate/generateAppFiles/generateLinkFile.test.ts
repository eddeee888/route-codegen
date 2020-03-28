import generateLinkFile, { GenerateLinkFileParams } from './generateLinkFile';
import { RoutingType } from '../config';

describe('generateLinkFile', () => {
  const defaultParams: GenerateLinkFileParams = {
    importGenerateUrl: { namedImports: [{ name: 'generateUrl' }], from: 'route-codegen' },
    routingType: RoutingType.ReactRouterV5,
    routeLinkOptions: {
      ReactRouterV5: {
        importLink: {
          from: 'src/common/Link',
          defaultImport: 'Link',
          namedImports: [{ name: 'CustomLinkProps' }],
        },
        linkComponent: 'Link',
        linkProps: 'CustomLinkProps',
        hrefProp: 'to',
        useRedirect: true,
        useParams: true,
      },
      Default: {
        hrefProp: 'href',
        linkComponent: 'a',
        inlineLinkProps: {
          template: `type InlineLinkProps = Omit<React.SomeReallyLongReactHTMLProps, 'href'>`,
          linkProps: 'InlineLinkProps',
        },
      },
      NextJS: {
        importLink: {
          from: 'src/NextJS/Link',
          defaultImport: 'Link',
          namedImports: [{ name: 'NextJSLinkProps' }],
        },
        hrefProp: 'customHref',
        linkComponent: 'Link',
        linkProps: 'NextJSLinkProps',
      },
    },
    routeName: 'Login',
    patternNamedExports: {
      filename: 'patternLogin',
      patternName: 'patternLogin',
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
      const templateFile = generateLinkFile({
        ...defaultParams,
        routingType: RoutingType.ReactRouterV5,
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
      const templateFile = generateLinkFile({
        ...defaultParams,
        routingType: RoutingType.ReactRouterV5,
        routeLinkOptions: {
          ...defaultParams.routeLinkOptions,
          ReactRouterV5: {
            importLink: {
              from: 'src/common/Link',
              namedImports: [{ name: 'CustomLinkProps' }, { name: 'CustomLink', importAs: 'Link' }],
            },
            linkComponent: 'Link',
            linkProps: 'CustomLinkProps',
            hrefProp: 'to',
            useRedirect: true,
            useParams: true,
          },
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

  describe('NextJS', () => {
    it('should generate correctly if no path params', () => {
      const templateFile = generateLinkFile({ ...defaultParams, routingType: RoutingType.NextJS });

      expect(templateFile.filename).toBe('LinkLogin');
      expect(templateFile.extension).toBe('.tsx');
      expect(templateFile.destinationDir).toBe('path/to/routes');
      expect(templateFile.template).toContain(`import React from 'react'
  import {generateUrl,} from 'route-codegen'
  import Link, {NextJSLinkProps,} from 'src/NextJS/Link'
  import {patternLogin,UrlPartsLogin,} from './patternLogin'
  type LinkLoginProps = Omit<NextJSLinkProps, 'customHref'> & UrlPartsLogin
  const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({  urlQuery, ...props }) => {
    const to = generateUrl(patternLogin, {}, urlQuery);
    return <Link {...props} customHref={to} />;
  }
  export default LinkLogin;`);
    });

    it('should generate correctly with path params', () => {
      const templateFile = generateLinkFile({
        ...defaultParams,
        routingType: RoutingType.NextJS,
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
  import {patternLogin,UrlPartsLogin,} from './patternLogin'
  type LinkLoginProps = Omit<NextJSLinkProps, 'customHref'> & UrlPartsLogin
  const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({ path, urlQuery, ...props }) => {
    const to = generateUrl(patternLogin, path, urlQuery);
    return <Link {...props} customHref={to} />;
  }
  export default LinkLogin;`);
    });

    it('should generate correctly with named component import', () => {
      const templateFile = generateLinkFile({
        ...defaultParams,
        routingType: RoutingType.NextJS,
        routeLinkOptions: {
          ...defaultParams.routeLinkOptions,
          NextJS: {
            importLink: {
              from: 'src/common/Link',
              namedImports: [{ name: 'CustomLinkProps' }, { name: 'CustomLink', importAs: 'Link' }],
            },
            linkComponent: 'Link',
            linkProps: 'CustomLinkProps',
            hrefProp: 'to',
          },
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

  describe('Default anchor', () => {
    it('should generate correctly with custom interface and no path params', () => {
      const templateFile = generateLinkFile({
        ...defaultParams,
        routingType: RoutingType.Default,
        routeLinkOptions: {
          ...defaultParams.routeLinkOptions,
          Default: {
            importLink: {
              from: 'src/Default/Link',
              defaultImport: 'Link',
              namedImports: [{ name: 'CustomLinkProps' }],
            },
            hrefProp: 'customDefaultHref',
            linkComponent: 'Link',
            linkProps: 'CustomLinkProps',
          },
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
      const templateFile = generateLinkFile({ ...defaultParams, routingType: RoutingType.Default });

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
      const templateFile = generateLinkFile({
        ...defaultParams,
        routingType: RoutingType.Default,
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
      const templateFile = generateLinkFile({
        ...defaultParams,
        routingType: RoutingType.Default,
        routeLinkOptions: {
          ...defaultParams.routeLinkOptions,
          Default: {
            importLink: {
              from: 'src/common/Link',
              namedImports: [{ name: 'CustomLinkProps' }, { name: 'CustomLink', importAs: 'Link' }],
            },
            linkComponent: 'Link',
            linkProps: 'CustomLinkProps',
            hrefProp: 'to',
          },
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
