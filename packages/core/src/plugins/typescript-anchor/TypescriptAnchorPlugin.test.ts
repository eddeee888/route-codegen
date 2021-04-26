import TypescriptAnchorPlugin, { TypescriptAnchorPluginConfig } from "./TypescriptAnchorPlugin";

describe("TypescriptAnchorPlugin - LinkFile", () => {
  const defaultConfig: TypescriptAnchorPluginConfig = {
    importGenerateUrl: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" },
    routeLinkOption: {
      hrefProp: "href",
      linkComponent: "a",
      inlineLinkProps: {
        template: `type InlineLinkProps = Omit<React.SomeReallyLongReactHTMLProps, 'href'>`,
        linkProps: "InlineLinkProps",
      },
      generateLinkComponent: true,
      generateRedirectComponent: false,
      generateUseRedirect: false,
    },
    routeName: "Login",
    patternNamedExports: {
      originName: "originLogin",
      filename: "patternLogin",
      patternName: "patternLogin",
      urlParamsInterfaceName: "UrlParamsLogin",
      patternNameNextJS: "patternNextJSLogin",
    },
    destinationDir: "path/to/routes",
    importRedirectServerSide: { defaultImport: "RedirectServerSide", from: "route-codegen/RedirectServerSide" },
  };

  it("should generate correctly with custom interface and no path params", () => {
    const [templateFile] = new TypescriptAnchorPlugin({
      ...defaultConfig,
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
        generateRedirectComponent: false,
        generateUseRedirect: false,
      },
    }).generate();

    expect(templateFile.filename).toBe("LinkLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
        "import React from 'react'
            import {generateUrl,} from 'route-codegen'
            import Link, {CustomLinkProps,} from 'src/Default/Link'
            import {patternLogin,UrlParamsLogin,originLogin,} from './patternLogin'
            type LinkLoginProps = Omit<CustomLinkProps, 'customDefaultHref'> & { urlParams?: UrlParamsLogin }
            export const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({ urlParams, ...props }) => {
              const to = generateUrl(patternLogin, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originLogin });
              return <Link {...props} customDefaultHref={to} />;
            }"
      `);
  });

  it("should generate correctly with inline interface and no path params", () => {
    const [templateFile] = new TypescriptAnchorPlugin({ ...defaultConfig }).generate();

    expect(templateFile.filename).toBe("LinkLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
        "import React from 'react'
            import {generateUrl,} from 'route-codegen'
            
            import {patternLogin,UrlParamsLogin,originLogin,} from './patternLogin'
            type InlineLinkProps = Omit<React.SomeReallyLongReactHTMLProps, 'href'> & { urlParams?: UrlParamsLogin }
            export const LinkLogin: React.FunctionComponent<InlineLinkProps> = ({ urlParams, ...props }) => {
              const to = generateUrl(patternLogin, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originLogin });
              return <a {...props} href={to} />;
            }"
      `);
  });

  it("should generate correctly with inline interface and path params", () => {
    const [templateFile] = new TypescriptAnchorPlugin({
      ...defaultConfig,
      patternNamedExports: {
        ...defaultConfig.patternNamedExports,
        pathParamsInterfaceName: "PathParamsLogin",
      },
    }).generate();

    expect(templateFile.filename).toBe("LinkLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
        "import React from 'react'
            import {generateUrl,} from 'route-codegen'
            
            import {patternLogin,UrlParamsLogin,originLogin,} from './patternLogin'
            type InlineLinkProps = Omit<React.SomeReallyLongReactHTMLProps, 'href'> & { urlParams: UrlParamsLogin }
            export const LinkLogin: React.FunctionComponent<InlineLinkProps> = ({ urlParams, ...props }) => {
              const to = generateUrl(patternLogin, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin ?? originLogin });
              return <a {...props} href={to} />;
            }"
      `);
  });

  it("should generate correctly with named component import", () => {
    const [templateFile] = new TypescriptAnchorPlugin({
      ...defaultConfig,
      routeLinkOption: {
        importLink: {
          from: "src/common/Link",
          namedImports: [{ name: "CustomLinkProps" }, { name: "CustomLink", importAs: "Link" }],
        },
        linkComponent: "Link",
        linkProps: "CustomLinkProps",
        hrefProp: "to",
        generateLinkComponent: true,
        generateRedirectComponent: false,
        generateUseRedirect: false,
      },
    }).generate();

    expect(templateFile.filename).toBe("LinkLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
        "import React from 'react'
            import {generateUrl,} from 'route-codegen'
            import {CustomLinkProps,CustomLink as Link,} from 'src/common/Link'
            import {patternLogin,UrlParamsLogin,originLogin,} from './patternLogin'
            type LinkLoginProps = Omit<CustomLinkProps, 'to'> & { urlParams?: UrlParamsLogin }
            export const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({ urlParams, ...props }) => {
              const to = generateUrl(patternLogin, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originLogin });
              return <Link {...props} to={to} />;
            }"
      `);
  });
});

describe("TypescriptAnchorPlugin - RedirectFile", () => {
  const defaultConfig: TypescriptAnchorPluginConfig = {
    importGenerateUrl: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" },
    importRedirectServerSide: { defaultImport: "RedirectServerSide", from: "route-codegen/RedirectServerSide" },
    routeName: "Login",
    patternNamedExports: {
      originName: "originLogin",
      filename: "patternLogin",
      patternName: "patternLogin",
      urlParamsInterfaceName: "UrlParamsLogin",
      patternNameNextJS: "patternNextJSLogin",
    },
    destinationDir: "path/to/routes",
    routeLinkOption: {
      hrefProp: "href",
      linkComponent: "a",
      inlineLinkProps: {
        template: `type InlineLinkProps = Omit<React.SomeReallyLongReactHTMLProps, 'href'>`,
        linkProps: "InlineLinkProps",
      },
      generateLinkComponent: false,
      generateRedirectComponent: true,
      generateUseRedirect: false,
    },
  };

  it("should generate correctly if no path params", () => {
    const [templateFile] = new TypescriptAnchorPlugin({ ...defaultConfig }).generate();

    expect(templateFile.filename).toBe("RedirectLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import React from 'react'
        import RedirectServerSide from 'route-codegen/RedirectServerSide'
        import {generateUrl,} from 'route-codegen'
        import {UrlParamsLogin,patternLogin,originLogin,} from './patternLogin'
        export const RedirectLogin: React.FunctionComponent<{ fallback?: React.ReactNode, urlParams?: UrlParamsLogin }> = ({ urlParams , ...props }) => {
          const to = generateUrl(patternLogin, { path: {}, query: urlParams.query, origin: urlParams.origin ?? originLogin });
          return <RedirectServerSide href={to} fallback={props.fallback} />;
        };"
    `);
  });

  it("should generate correctly with path params", () => {
    const [templateFile] = new TypescriptAnchorPlugin({
      ...defaultConfig,
      patternNamedExports: {
        ...defaultConfig.patternNamedExports,
        pathParamsInterfaceName: "PathParamsLogin",
      },
    }).generate();

    expect(templateFile.filename).toBe("RedirectLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import React from 'react'
        import RedirectServerSide from 'route-codegen/RedirectServerSide'
        import {generateUrl,} from 'route-codegen'
        import {UrlParamsLogin,patternLogin,originLogin,} from './patternLogin'
        export const RedirectLogin: React.FunctionComponent<{ fallback?: React.ReactNode, urlParams: UrlParamsLogin }> = ({ urlParams , ...props }) => {
          const to = generateUrl(patternLogin, { path: urlParams.path, query: urlParams.query, origin: urlParams.origin ?? originLogin });
          return <RedirectServerSide href={to} fallback={props.fallback} />;
        };"
    `);
  });
});

describe("TypescriptAnchorPlugin - UseRedirect", () => {
  it("should generate when there is no pathParams", () => {
    const [templateFile] = new TypescriptAnchorPlugin({
      routeName: "Login",
      patternNamedExports: {
        originName: "originLogin",
        filename: "patternLogin",
        patternName: "patternLogin",
        urlParamsInterfaceName: "UrlParamsLogin",
      },
      destinationDir: "path/to/routes",
      importGenerateUrl: {
        from: "route-codegen",
        namedImports: [{ name: "generateUrl" }],
      },
      routeLinkOption: {
        hrefProp: "href",
        linkComponent: "a",
        inlineLinkProps: {
          template: `type InlineLinkProps = Omit<React.SomeReallyLongReactHTMLProps, 'href'>`,
          linkProps: "InlineLinkProps",
        },
        generateLinkComponent: false,
        generateRedirectComponent: false,
        generateUseRedirect: true,
      },
      importRedirectServerSide: { defaultImport: "RedirectServerSide", from: "route-codegen/RedirectServerSide" },
    }).generate();

    expect(templateFile.filename).toBe("useRedirectLogin");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import {UrlParamsLogin,patternLogin,originLogin,} from './patternLogin'
        import {generateUrl,} from 'route-codegen'
        export type RedirectFnLogin = (urlParams?: UrlParamsLogin) => void;
        export const useRedirectLogin = (): RedirectFnLogin => {
          const redirect: RedirectFnLogin = urlParams => {
            const to = generateUrl(patternLogin, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originLogin });
            if (!!window && !!window.location) {
              window.location.href = to;
            }
            return;
          }
          return redirect;
        }"
    `);
  });

  it("should generate when there is pathParams", () => {
    const [templateFile] = new TypescriptAnchorPlugin({
      routeName: "UserInfo",
      patternNamedExports: {
        originName: "originLogin",
        filename: "patternUserInfo",
        patternName: "patternUserInfo",
        urlParamsInterfaceName: "UrlParamsUserInfo",
        pathParamsInterfaceName: "PathParamsUserInfo",
      },
      destinationDir: "path/to/routes",
      importGenerateUrl: {
        from: "route-codegen",
        namedImports: [{ name: "generateUrl" }],
      },
      routeLinkOption: {
        hrefProp: "href",
        linkComponent: "a",
        inlineLinkProps: {
          template: `type InlineLinkProps = Omit<React.SomeReallyLongReactHTMLProps, 'href'>`,
          linkProps: "InlineLinkProps",
        },
        generateLinkComponent: false,
        generateRedirectComponent: false,
        generateUseRedirect: true,
      },
      importRedirectServerSide: { defaultImport: "RedirectServerSide", from: "route-codegen/RedirectServerSide" },
    }).generate();

    expect(templateFile.filename).toBe("useRedirectUserInfo");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import {UrlParamsUserInfo,patternUserInfo,originLogin,} from './patternUserInfo'
        import {generateUrl,} from 'route-codegen'
        export type RedirectFnUserInfo = (urlParams: UrlParamsUserInfo) => void;
        export const useRedirectUserInfo = (): RedirectFnUserInfo => {
          const redirect: RedirectFnUserInfo = urlParams => {
            const to = generateUrl(patternUserInfo, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin ?? originLogin });
            if (!!window && !!window.location) {
              window.location.href = to;
            }
            return;
          }
          return redirect;
        }"
    `);
  });
});
