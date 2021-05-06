import { plugin, TypescriptAnchorPluginConfig } from "./TypescriptAnchorPlugin";

describe("TypescriptAnchorPlugin - LinkFile", () => {
  const defaultConfig: TypescriptAnchorPluginConfig = {
    appName: "tradish-app",
    routePattern: "/login",
    context: {
      topLevelGenerateOptions: {
        generateLinkComponent: false,
        generateRedirectComponent: false,
        generateUseParams: false,
        generateUseRedirect: false,
      },
      importGenerateUrl: { importedName: "generateUrl", import: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" } },
      importRedirectServerSide: {
        importedName: "RedirectServerSide",
        import: { defaultImport: "RedirectServerSide", from: "route-codegen/RedirectServerSide" },
      },
    },
    extraConfig: {
      generate: {
        linkComponent: true,
        redirectComponent: false,
        useRedirect: false,
      },
    },
    routeName: "Login",
    patternNamedExports: {
      originName: "originLogin",
      filename: "patternLogin",
      patternName: "patternLogin",
      urlParamsInterfaceName: "UrlParamsLogin",
    },
    destinationDir: "path/to/routes",
  };

  it("should generate correctly with custom interface and no path params", () => {
    const [templateFile] = plugin.generate({
      ...defaultConfig,
      extraConfig: {
        importCustomLink: {
          componentDefaultImport: true,
          from: "src/Default/Link",
          hrefProp: "customDefaultHref",
          propsNamedImport: "CustomLinkProps",
        },
        generate: {
          linkComponent: true,
          redirectComponent: false,
          useRedirect: false,
        },
      },
    });

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
    const [templateFile] = plugin.generate({ ...defaultConfig });

    expect(templateFile.filename).toBe("LinkLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import React from 'react'
          import {generateUrl,} from 'route-codegen'
          
          import {patternLogin,UrlParamsLogin,originLogin,} from './patternLogin'
          type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, 'href'> & { urlParams?: UrlParamsLogin }
          export const LinkLogin: React.FunctionComponent<LinkProps> = ({ urlParams, ...props }) => {
            const to = generateUrl(patternLogin, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originLogin });
            return <a {...props} href={to} />;
          }"
    `);
  });

  it("should generate correctly with inline interface and path params", () => {
    const [templateFile] = plugin.generate({
      ...defaultConfig,
      patternNamedExports: {
        ...defaultConfig.patternNamedExports,
        pathParamsInterfaceName: "PathParamsLogin",
      },
    });

    expect(templateFile.filename).toBe("LinkLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import React from 'react'
          import {generateUrl,} from 'route-codegen'
          
          import {patternLogin,UrlParamsLogin,originLogin,} from './patternLogin'
          type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, 'href'> & { urlParams: UrlParamsLogin }
          export const LinkLogin: React.FunctionComponent<LinkProps> = ({ urlParams, ...props }) => {
            const to = generateUrl(patternLogin, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin ?? originLogin });
            return <a {...props} href={to} />;
          }"
    `);
  });

  it("should generate correctly with named component import", () => {
    const [templateFile] = plugin.generate({
      ...defaultConfig,
      extraConfig: {
        importCustomLink: {
          componentNamedImport: "CustomLink",
          propsNamedImport: "CustomLinkProps",
          hrefProp: "to",
          from: "src/common/Link",
        },
        generate: {
          linkComponent: true,
          redirectComponent: false,
          useRedirect: false,
        },
      },
    });

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
    appName: "tradish-app",
    routePattern: "/login",
    context: {
      topLevelGenerateOptions: {
        generateUseRedirect: false,
        generateUseParams: false,
        generateRedirectComponent: false,
        generateLinkComponent: false,
      },
      importGenerateUrl: { importedName: "generateUrl", import: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" } },
      importRedirectServerSide: {
        importedName: "RedirectServerSide",
        import: { defaultImport: "RedirectServerSide", from: "route-codegen/RedirectServerSide" },
      },
    },
    routeName: "Login",
    patternNamedExports: {
      originName: "originLogin",
      filename: "patternLogin",
      patternName: "patternLogin",
      urlParamsInterfaceName: "UrlParamsLogin",
    },
    destinationDir: "path/to/routes",
    extraConfig: {
      generate: {
        linkComponent: false,
        redirectComponent: true,
        useRedirect: false,
      },
    },
  };

  it("should generate correctly if no path params", () => {
    const [templateFile] = plugin.generate({ ...defaultConfig });

    expect(templateFile.filename).toBe("RedirectLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import React from 'react'
        import RedirectServerSide from 'route-codegen/RedirectServerSide'
        import {generateUrl,} from 'route-codegen'
        import {UrlParamsLogin,patternLogin,originLogin,} from './patternLogin'
        export const RedirectLogin: React.FunctionComponent<{ fallback?: React.ReactNode, urlParams?: UrlParamsLogin }> = ({ urlParams , ...props }) => {
          const to = generateUrl(patternLogin, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originLogin });
          return <RedirectServerSide href={to} fallback={props.fallback} />;
        };"
    `);
  });

  it("should generate correctly with path params", () => {
    const [templateFile] = plugin.generate({
      ...defaultConfig,
      patternNamedExports: {
        ...defaultConfig.patternNamedExports,
        pathParamsInterfaceName: "PathParamsLogin",
      },
    });

    expect(templateFile.filename).toBe("RedirectLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import React from 'react'
        import RedirectServerSide from 'route-codegen/RedirectServerSide'
        import {generateUrl,} from 'route-codegen'
        import {UrlParamsLogin,patternLogin,originLogin,} from './patternLogin'
        export const RedirectLogin: React.FunctionComponent<{ fallback?: React.ReactNode, urlParams: UrlParamsLogin }> = ({ urlParams , ...props }) => {
          const to = generateUrl(patternLogin, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin ?? originLogin });
          return <RedirectServerSide href={to} fallback={props.fallback} />;
        };"
    `);
  });
});

describe("TypescriptAnchorPlugin - UseRedirect", () => {
  it("should generate when there is no pathParams", () => {
    const [templateFile] = plugin.generate({
      appName: "tradish-app",
      routePattern: "/login",
      routeName: "Login",
      context: {
        topLevelGenerateOptions: {
          generateLinkComponent: false,
          generateRedirectComponent: false,
          generateUseParams: false,
          generateUseRedirect: false,
        },
        importGenerateUrl: { importedName: "generateUrl", import: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" } },
        importRedirectServerSide: {
          importedName: "RedirectServerSide",
          import: { defaultImport: "RedirectServerSide", from: "route-codegen/RedirectServerSide" },
        },
      },
      patternNamedExports: {
        originName: "originLogin",
        filename: "patternLogin",
        patternName: "patternLogin",
        urlParamsInterfaceName: "UrlParamsLogin",
      },
      destinationDir: "path/to/routes",
      extraConfig: {
        generate: {
          linkComponent: false,
          redirectComponent: false,
          useRedirect: true,
        },
      },
    });

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
    const [templateFile] = plugin.generate({
      appName: "tradish-app",
      routePattern: "/user/:id",
      context: {
        topLevelGenerateOptions: {
          generateLinkComponent: false,
          generateRedirectComponent: false,
          generateUseParams: false,
          generateUseRedirect: false,
        },
        importGenerateUrl: { importedName: "generateUrl", import: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" } },
        importRedirectServerSide: {
          importedName: "RedirectServerSide",
          import: { defaultImport: "RedirectServerSide", from: "route-codegen/RedirectServerSide" },
        },
      },
      routeName: "UserInfo",
      patternNamedExports: {
        originName: "originLogin",
        filename: "patternUserInfo",
        patternName: "patternUserInfo",
        urlParamsInterfaceName: "UrlParamsUserInfo",
        pathParamsInterfaceName: "PathParamsUserInfo",
      },
      destinationDir: "path/to/routes",
      extraConfig: {
        generate: {
          linkComponent: false,
          redirectComponent: false,
          useRedirect: true,
        },
      },
    });

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
