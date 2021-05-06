import { plugin, TypescriptReactRouter5PluginConfig } from "./TypescriptReactRouter5Plugin";

describe("TypescriptReactRouter5Plugin - Link file", () => {
  const defaultParams: TypescriptReactRouter5PluginConfig = {
    appName: "rr5-app",
    routePattern: "/login",
    routeName: "Login",
    context: {
      topLevelGenerateOptions: {
        generateLinkComponent: false,
        generateRedirectComponent: false,
        generateUseRedirect: false,
        generateUseParams: false,
      },
      importGenerateUrl: { importedName: "generateUrl", import: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" } },
      importRedirectServerSide: {
        importedName: "RedirectServerSide",
        import: { defaultImport: "RedirectServerSide", from: "route-codegen/RedirectServerSide" },
      },
    },
    destinationDir: "path/to/routes",
    extraConfig: {
      importCustomLink: {
        from: "src/common/Link",
        componentDefaultImport: true,
        propsNamedImport: "CustomLinkProps",
        hrefProp: "to",
      },
      generate: {
        linkComponent: true,
        redirectComponent: false,
        useRedirect: false,
        useParams: false,
      },
      mode: "strict",
    },
    patternNamedExports: {
      originName: "originLogin",
      filename: "patternLogin",
      patternName: "patternLogin",
      urlParamsInterfaceName: "UrlParamsLogin",
    },
  };

  it("should generate correctly if no path params", () => {
    const [templateFile] = plugin.generate({ ...defaultParams });

    expect(templateFile.filename).toBe("LinkLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import React from 'react'
          import {generateUrl,} from 'route-codegen'
          import Link, {CustomLinkProps,} from 'src/common/Link'
          import {patternLogin,UrlParamsLogin,} from './patternLogin'
          type LinkLoginProps = Omit<CustomLinkProps, 'to'> & { urlParams?: UrlParamsLogin }
          export const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({ urlParams, ...props }) => {
            const to = generateUrl(patternLogin, { path: {}, query: urlParams?.query, origin: urlParams?.origin });
            return <Link {...props} to={to} />;
          }"
    `);
  });

  it("should generate correctly with path params", () => {
    const [templateFile] = plugin.generate({
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
          import Link, {CustomLinkProps,} from 'src/common/Link'
          import {patternLogin,UrlParamsLogin,} from './patternLogin'
          type LinkLoginProps = Omit<CustomLinkProps, 'to'> & { urlParams: UrlParamsLogin }
          export const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({ urlParams, ...props }) => {
            const to = generateUrl(patternLogin, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin });
            return <Link {...props} to={to} />;
          }"
    `);
  });

  it("should generate correctly with named component import", () => {
    const [templateFile] = plugin.generate({
      ...defaultParams,
      extraConfig: {
        importCustomLink: {
          from: "src/common/Link",
          componentNamedImport: "CustomLink",
          propsNamedImport: "CustomLinkProps",
          hrefProp: "to",
        },
        generate: {
          linkComponent: true,
          redirectComponent: true,
          useRedirect: true,
          useParams: true,
        },
        mode: "strict",
      },
    });

    expect(templateFile.filename).toBe("LinkLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import React from 'react'
          import {generateUrl,} from 'route-codegen'
          import {CustomLinkProps,CustomLink as Link,} from 'src/common/Link'
          import {patternLogin,UrlParamsLogin,} from './patternLogin'
          type LinkLoginProps = Omit<CustomLinkProps, 'to'> & { urlParams?: UrlParamsLogin }
          export const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({ urlParams, ...props }) => {
            const to = generateUrl(patternLogin, { path: {}, query: urlParams?.query, origin: urlParams?.origin });
            return <Link {...props} to={to} />;
          }"
    `);
  });
});

describe("TypescriptReactRouter5Plugin - Redirect file", () => {
  const defaultParams: TypescriptReactRouter5PluginConfig = {
    appName: "rr5-app",
    routeName: "Login",
    routePattern: "/login",
    patternNamedExports: {
      originName: "originLogin",
      filename: "patternLogin",
      patternName: "patternLogin",
      urlParamsInterfaceName: "UrlParamsLogin",
    },
    destinationDir: "path/to/routes",
    context: {
      topLevelGenerateOptions: {
        generateLinkComponent: false,
        generateRedirectComponent: false,
        generateUseRedirect: false,
        generateUseParams: false,
      },
      importGenerateUrl: { importedName: "generateUrl", import: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" } },
      importRedirectServerSide: {
        importedName: "RedirectServerSide",
        import: { defaultImport: "RedirectServerSide", from: "route-codegen/RedirectServerSide" },
      },
    },
    extraConfig: {
      importCustomLink: {
        from: "src/common/Link",
        componentDefaultImport: true,
        propsNamedImport: "CustomLinkProps",
        hrefProp: "to",
      },
      generate: {
        linkComponent: false,
        redirectComponent: true,
        useRedirect: false,
        useParams: false,
      },
      mode: "strict",
    },
  };

  it("should generate correctly if no path params", () => {
    const [templateFile] = plugin.generate({ ...defaultParams });

    expect(templateFile.filename).toBe("RedirectLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import React from 'react'
          import {generateUrl,} from 'route-codegen'
          import {Redirect,} from 'react-router'
          import {UrlParamsLogin,patternLogin,} from './patternLogin'
          export const RedirectLogin: React.FunctionComponent<{ fallback?: React.ReactNode, urlParams?: UrlParamsLogin }> = ({ urlParams, ...props }) => {
            const to = generateUrl(patternLogin, { path: {}, query: urlParams?.query, origin: urlParams?.origin });
            return (
              <>
                <Redirect to={to} />
                {props.fallback}
              </>
            );
          };"
    `);
  });

  it("should generate correctly with path params", () => {
    const [templateFile] = plugin.generate({
      ...defaultParams,
      patternNamedExports: {
        ...defaultParams.patternNamedExports,
        pathParamsInterfaceName: "PathParamsLogin",
      },
    });

    expect(templateFile.filename).toBe("RedirectLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import React from 'react'
          import {generateUrl,} from 'route-codegen'
          import {Redirect,} from 'react-router'
          import {UrlParamsLogin,patternLogin,} from './patternLogin'
          export const RedirectLogin: React.FunctionComponent<{ fallback?: React.ReactNode, urlParams: UrlParamsLogin }> = ({ urlParams, ...props }) => {
            const to = generateUrl(patternLogin, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin });
            return (
              <>
                <Redirect to={to} />
                {props.fallback}
              </>
            );
          };"
    `);
  });
});

describe("TypescriptReactRouter5Plugin - UseParams", () => {
  it("should generate strict mode correctly", () => {
    const [templateFile] = plugin.generate({
      appName: "rr5-app",
      routePattern: "/user",
      routeName: "User",
      context: {
        topLevelGenerateOptions: {
          generateLinkComponent: false,
          generateRedirectComponent: false,
          generateUseRedirect: false,
          generateUseParams: false,
        },
        importGenerateUrl: { importedName: "generateUrl", import: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" } },
        importRedirectServerSide: {
          importedName: "RedirectServerSide",
          import: { defaultImport: "RedirectServerSide", from: "route-codegen/RedirectServerSide" },
        },
      },
      patternNamedExports: {
        originName: "originUser",
        urlParamsInterfaceName: "UrlParamsUser",
        filename: "patternUser",
        pathParamsInterfaceName: "UserPathParams",
        patternName: "patternUser",
      },
      destinationDir: "path/to/routes",
      extraConfig: {
        importCustomLink: {
          from: "src/common/Link",
          componentDefaultImport: true,
          propsNamedImport: "CustomLinkProps",
          hrefProp: "to",
        },
        generate: {
          linkComponent: false,
          redirectComponent: false,
          useRedirect: false,
          useParams: true,
        },
        mode: "strict",
      },
    });

    expect(templateFile.filename).toBe("useParamsUser");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import {UserPathParams,patternUser as pattern,} from './patternUser'
            import {useRouteMatch,} from 'react-router'
            export const useParamsUser = (): UserPathParams => {
              const { path, params } = useRouteMatch<UserPathParams>();
            if (path !== pattern) {
              const error = \`You are trying to use useParams for \\"\${pattern}\\" in \\"\${path}\\". Make sure you are using the right route link object!\`;
              throw new Error(error);
            }
            return params;
            }"
    `);
  });

  it("should generate loose mode correctly", () => {
    const [templateFile] = plugin.generate({
      appName: "rr5-app",
      routePattern: "/user",
      routeName: "User",
      context: {
        topLevelGenerateOptions: {
          generateLinkComponent: false,
          generateRedirectComponent: false,
          generateUseRedirect: false,
          generateUseParams: false,
        },
        importGenerateUrl: { importedName: "generateUrl", import: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" } },
        importRedirectServerSide: {
          importedName: "RedirectServerSide",
          import: { defaultImport: "RedirectServerSide", from: "route-codegen/RedirectServerSide" },
        },
      },
      patternNamedExports: {
        originName: "originUser",
        urlParamsInterfaceName: "UrlParamsUser",
        filename: "patternUser",
        pathParamsInterfaceName: "UserPathParams",
        patternName: "patternUser",
      },
      destinationDir: "path/to/routes",
      extraConfig: {
        importCustomLink: {
          from: "src/common/Link",
          componentDefaultImport: true,
          propsNamedImport: "CustomLinkProps",
          hrefProp: "to",
        },
        generate: {
          linkComponent: false,
          redirectComponent: false,
          useRedirect: false,
          useParams: true,
        },
        mode: "loose",
      },
    });

    expect(templateFile.filename).toBe("useParamsUser");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import {UserPathParams,} from './patternUser'
            import {useRouteMatch,} from 'react-router'
            export const useParamsUser = (): UserPathParams => {
              return useRouteMatch<UserPathParams>().params;
            }"
    `);
  });
});

describe("TypescriptReactRouter5Plugin - UseRedirect file", () => {
  it("should generate when there is no pathParams", () => {
    const [templateFile] = plugin.generate({
      appName: "rr5-app",
      routePattern: "/login",
      routeName: "Login",
      context: {
        topLevelGenerateOptions: {
          generateLinkComponent: false,
          generateRedirectComponent: false,
          generateUseRedirect: false,
          generateUseParams: false,
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
        importCustomLink: {
          from: "src/common/Link",
          componentDefaultImport: true,
          propsNamedImport: "CustomLinkProps",
          hrefProp: "to",
        },
        generate: {
          linkComponent: false,
          redirectComponent: false,
          useRedirect: true,
          useParams: false,
        },
        mode: "loose",
      },
    });

    expect(templateFile.filename).toBe("useRedirectLogin");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import {useHistory,} from 'react-router'
          import {UrlParamsLogin,patternLogin,} from './patternLogin'
          import {generateUrl,} from 'route-codegen'
          export type RedirectFnLogin = (urlParams?: UrlParamsLogin) => void;
          export const useRedirectLogin = (): RedirectFnLogin => {
            const history = useHistory();
            const redirect: RedirectFnLogin = urlParams => {
              const to = generateUrl(patternLogin, { path: {}, query: urlParams?.query, origin: urlParams?.origin });
              history.push(to);
            }
            return redirect;
          }"
    `);
  });

  it("should generate when there is pathParams", () => {
    const [templateFile] = plugin.generate({
      appName: "rr5-app",
      routePattern: "/user/:id",
      routeName: "UserInfo",
      patternNamedExports: {
        originName: "originLogin",
        filename: "patternUserInfo",
        patternName: "patternUserInfo",
        urlParamsInterfaceName: "UrlParamsUserInfo",
        pathParamsInterfaceName: "PathParamsUserInfo",
      },
      context: {
        topLevelGenerateOptions: {
          generateLinkComponent: false,
          generateRedirectComponent: false,
          generateUseRedirect: false,
          generateUseParams: false,
        },
        importGenerateUrl: { importedName: "generateUrl", import: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" } },
        importRedirectServerSide: {
          importedName: "RedirectServerSide",
          import: { defaultImport: "RedirectServerSide", from: "route-codegen/RedirectServerSide" },
        },
      },
      destinationDir: "path/to/routes",
      extraConfig: {
        importCustomLink: {
          from: "src/common/Link",
          componentDefaultImport: true,
          propsNamedImport: "CustomLinkProps",
          hrefProp: "to",
        },
        generate: {
          linkComponent: false,
          redirectComponent: false,
          useRedirect: true,
          useParams: false,
        },
        mode: "loose",
      },
    });

    expect(templateFile.filename).toBe("useRedirectUserInfo");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import {useHistory,} from 'react-router'
          import {UrlParamsUserInfo,patternUserInfo,} from './patternUserInfo'
          import {generateUrl,} from 'route-codegen'
          export type RedirectFnUserInfo = (urlParams: UrlParamsUserInfo) => void;
          export const useRedirectUserInfo = (): RedirectFnUserInfo => {
            const history = useHistory();
            const redirect: RedirectFnUserInfo = urlParams => {
              const to = generateUrl(patternUserInfo, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin });
              history.push(to);
            }
            return redirect;
          }"
    `);
  });
});
