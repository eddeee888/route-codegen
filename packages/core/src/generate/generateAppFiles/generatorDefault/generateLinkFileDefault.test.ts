import { generateLinkFileDefault, GenerateLinkFileDefaultParams } from "./generateLinkFileDefault";

describe("generateLinkFileDefault", () => {
  const defaultParams: GenerateLinkFileDefaultParams = {
    importGenerateUrl: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" },
    routeLinkOption: {
      hrefProp: "href",
      linkComponent: "a",
      inlineLinkProps: {
        template: `type InlineLinkProps = Omit<React.SomeReallyLongReactHTMLProps, 'href'>`,
        linkProps: "InlineLinkProps",
      },
      generateLinkComponent: true,
      generateRedirectComponent: true,
      generateUseRedirect: true,
    },
    routeName: "Login",
    patternNamedExports: {
      originName: "originLogin",
      filename: "patternLogin",
      patternName: "patternLogin",
      urlPartsInterfaceName: "UrlPartsLogin",
      patternNameNextJS: "patternNextJSLogin",
    },
    destinationDir: "path/to/routes",
  };

  describe("Default anchor", () => {
    it("should generate correctly with custom interface and no path params", () => {
      const templateFile = generateLinkFileDefault({
        ...defaultParams,
        routeLinkOption: {
          importLink: {
            from: "src/Default/Link",
            defaultImport: "Link",
            namedImports: [{ name: "CustomLinkProps" }],
          },
          hrefProp: "customDefaultHref",
          linkComponent: "Link",
          linkProps: "CustomLinkProps",
          generateLinkComponent: true,
          generateRedirectComponent: true,
          generateUseRedirect: true,
        },
      });

      expect(templateFile.filename).toBe("LinkLogin");
      expect(templateFile.extension).toBe(".tsx");
      expect(templateFile.destinationDir).toBe("path/to/routes");
      expect(templateFile.template).toMatchInlineSnapshot(`
        "import React from 'react'
          import {generateUrl,} from 'route-codegen'
          import Link, {CustomLinkProps,} from 'src/Default/Link'
          import {patternLogin,UrlPartsLogin,originLogin,} from './patternLogin'
          type LinkLoginProps = Omit<CustomLinkProps, 'customDefaultHref'> & UrlPartsLogin
          export const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({  query, origin, ...props }) => {
            const to = generateUrl(patternLogin, { path: {}, query, origin: origin ?? originLogin });
            return <Link {...props} customDefaultHref={to} />;
          }"
      `);
    });

    it("should generate correctly with inline interface and no path params", () => {
      const templateFile = generateLinkFileDefault({ ...defaultParams });

      expect(templateFile.filename).toBe("LinkLogin");
      expect(templateFile.extension).toBe(".tsx");
      expect(templateFile.destinationDir).toBe("path/to/routes");
      expect(templateFile.template).toMatchInlineSnapshot(`
        "import React from 'react'
          import {generateUrl,} from 'route-codegen'
          
          import {patternLogin,UrlPartsLogin,originLogin,} from './patternLogin'
          type InlineLinkProps = Omit<React.SomeReallyLongReactHTMLProps, 'href'> & UrlPartsLogin
          export const LinkLogin: React.FunctionComponent<InlineLinkProps> = ({  query, origin, ...props }) => {
            const to = generateUrl(patternLogin, { path: {}, query, origin: origin ?? originLogin });
            return <a {...props} href={to} />;
          }"
      `);
    });

    it("should generate correctly with inline interface and path params", () => {
      const templateFile = generateLinkFileDefault({
        ...defaultParams,
        patternNamedExports: {
          ...defaultParams.patternNamedExports,
          pathParamsInterfaceName: "PathParamsLogin",
        },
      });

      expect(templateFile.filename).toBe("LinkLogin");
      expect(templateFile.extension).toBe(".tsx");
      expect(templateFile.destinationDir).toBe("path/to/routes");
      expect(templateFile.template).toMatchInlineSnapshot(`
        "import React from 'react'
          import {generateUrl,} from 'route-codegen'
          
          import {patternLogin,UrlPartsLogin,originLogin,} from './patternLogin'
          type InlineLinkProps = Omit<React.SomeReallyLongReactHTMLProps, 'href'> & UrlPartsLogin
          export const LinkLogin: React.FunctionComponent<InlineLinkProps> = ({ path, query, origin, ...props }) => {
            const to = generateUrl(patternLogin, { path: path, query, origin: origin ?? originLogin });
            return <a {...props} href={to} />;
          }"
      `);
    });

    it("should generate correctly with named component import", () => {
      const templateFile = generateLinkFileDefault({
        ...defaultParams,
        routeLinkOption: {
          importLink: {
            from: "src/common/Link",
            namedImports: [{ name: "CustomLinkProps" }, { name: "CustomLink", importAs: "Link" }],
          },
          linkComponent: "Link",
          linkProps: "CustomLinkProps",
          hrefProp: "to",
          generateLinkComponent: true,
          generateRedirectComponent: true,
          generateUseRedirect: true,
        },
      });

      expect(templateFile.filename).toBe("LinkLogin");
      expect(templateFile.extension).toBe(".tsx");
      expect(templateFile.destinationDir).toBe("path/to/routes");
      expect(templateFile.template).toMatchInlineSnapshot(`
        "import React from 'react'
          import {generateUrl,} from 'route-codegen'
          import {CustomLinkProps,CustomLink as Link,} from 'src/common/Link'
          import {patternLogin,UrlPartsLogin,originLogin,} from './patternLogin'
          type LinkLoginProps = Omit<CustomLinkProps, 'to'> & UrlPartsLogin
          export const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({  query, origin, ...props }) => {
            const to = generateUrl(patternLogin, { path: {}, query, origin: origin ?? originLogin });
            return <Link {...props} to={to} />;
          }"
      `);
    });
  });
});
