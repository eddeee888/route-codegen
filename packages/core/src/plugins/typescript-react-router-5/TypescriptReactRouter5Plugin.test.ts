import TypescriptReactRouter5Plugin, { TypescriptReactRouter5PluginConfig } from "./TypescriptReactRouter5Plugin";

describe("TypescriptReactRouter5Plugin - Link file", () => {
  const defaultParams: TypescriptReactRouter5PluginConfig = {
    importGenerateUrl: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" },
    routeLinkOption: {
      importLink: {
        from: "src/common/Link",
        defaultImport: "Link",
        namedImports: [{ name: "CustomLinkProps" }],
      },
      linkComponent: "Link",
      linkProps: "CustomLinkProps",
      hrefProp: "to",
      generateLinkComponent: true,
      generateRedirectComponent: false,
      generateUseRedirect: false,
      generateUseParams: false,
      mode: "strict",
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
  };

  it("should generate correctly if no path params", () => {
    const [templateFile] = new TypescriptReactRouter5Plugin({ ...defaultParams }).generate();

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
    const [templateFile] = new TypescriptReactRouter5Plugin({
      ...defaultParams,
      patternNamedExports: {
        ...defaultParams.patternNamedExports,
        pathParamsInterfaceName: "PathParamsLogin",
      },
    }).generate();

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
    const [templateFile] = new TypescriptReactRouter5Plugin({
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
        generateUseParams: true,
        mode: "strict",
      },
    }).generate();

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
    importGenerateUrl: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" },
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
      importLink: {
        from: "src/common/Link",
        defaultImport: "Link",
        namedImports: [{ name: "CustomLinkProps" }],
      },
      linkComponent: "Link",
      linkProps: "CustomLinkProps",
      hrefProp: "to",
      generateLinkComponent: false,
      generateRedirectComponent: true,
      generateUseRedirect: false,
      generateUseParams: false,
      mode: "strict",
    },
  };

  it("should generate correctly if no path params", () => {
    const [templateFile] = new TypescriptReactRouter5Plugin({ ...defaultParams }).generate();

    expect(templateFile.filename).toBe("RedirectLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import React from 'react'
          import {generateUrl,} from 'route-codegen'
          import {Redirect,} from 'react-router'
          import {UrlParamsLogin,patternLogin,} from './patternLogin'
          export const RedirectLogin: React.FunctionComponent<{ fallback?: React.ReactNode, urlParams?: UrlParamsLogin }> = ({ urlParams, ...props }) => {
            const to = generateUrl(patternLogin, { path: {}, query: urlParams.query, origin: urlParams.origin });
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
    const [templateFile] = new TypescriptReactRouter5Plugin({
      ...defaultParams,
      patternNamedExports: {
        ...defaultParams.patternNamedExports,
        pathParamsInterfaceName: "PathParamsLogin",
      },
    }).generate();

    expect(templateFile.filename).toBe("RedirectLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import React from 'react'
          import {generateUrl,} from 'route-codegen'
          import {Redirect,} from 'react-router'
          import {UrlParamsLogin,patternLogin,} from './patternLogin'
          export const RedirectLogin: React.FunctionComponent<{ fallback?: React.ReactNode, urlParams: UrlParamsLogin }> = ({ urlParams, ...props }) => {
            const to = generateUrl(patternLogin, { path: urlParams.path, query: urlParams.query, origin: urlParams.origin });
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
    const [templateFile] = new TypescriptReactRouter5Plugin({
      patternNamedExports: {
        originName: "originUser",
        urlParamsInterfaceName: "UrlParamsUser",
        filename: "patternUser",
        pathParamsInterfaceName: "UserPathParams",
        patternName: "patternUser",
      },
      destinationDir: "path/to/routes",
      routeName: "User",
      importGenerateUrl: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" },
      routeLinkOption: {
        importLink: {
          from: "src/common/Link",
          defaultImport: "Link",
          namedImports: [{ name: "CustomLinkProps" }],
        },
        linkComponent: "Link",
        linkProps: "CustomLinkProps",
        hrefProp: "to",
        generateLinkComponent: false,
        generateRedirectComponent: false,
        generateUseRedirect: false,
        generateUseParams: true,
        mode: "strict",
      },
    }).generate();

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
    const [templateFile] = new TypescriptReactRouter5Plugin({
      patternNamedExports: {
        originName: "originUser",
        urlParamsInterfaceName: "UrlParamsUser",
        filename: "patternUser",
        pathParamsInterfaceName: "UserPathParams",
        patternName: "patternUser",
      },
      destinationDir: "path/to/routes",
      routeName: "User",
      importGenerateUrl: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" },
      routeLinkOption: {
        importLink: {
          from: "src/common/Link",
          defaultImport: "Link",
          namedImports: [{ name: "CustomLinkProps" }],
        },
        linkComponent: "Link",
        linkProps: "CustomLinkProps",
        hrefProp: "to",
        generateLinkComponent: false,
        generateRedirectComponent: false,
        generateUseRedirect: false,
        generateUseParams: true,
        mode: "loose",
      },
    }).generate();

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
    const [templateFile] = new TypescriptReactRouter5Plugin({
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
        importLink: {
          from: "src/common/Link",
          defaultImport: "Link",
          namedImports: [{ name: "CustomLinkProps" }],
        },
        linkComponent: "Link",
        linkProps: "CustomLinkProps",
        hrefProp: "to",
        generateLinkComponent: false,
        generateRedirectComponent: false,
        generateUseRedirect: true,
        generateUseParams: false,
        mode: "loose",
      },
    }).generate();

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
    const [templateFile] = new TypescriptReactRouter5Plugin({
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
        importLink: {
          from: "src/common/Link",
          defaultImport: "Link",
          namedImports: [{ name: "CustomLinkProps" }],
        },
        linkComponent: "Link",
        linkProps: "CustomLinkProps",
        hrefProp: "to",
        generateLinkComponent: false,
        generateRedirectComponent: false,
        generateUseRedirect: true,
        generateUseParams: false,
        mode: "loose",
      },
    }).generate();

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
