import TypescriptNextJSPlugin, { TypescriptNextJSPluginConfig } from "./TypescriptNextJSPlugin";

describe("TypescriptNextJSPlugin - Link file", () => {
  const defaultParams: TypescriptNextJSPluginConfig = {
    importGenerateUrl: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" },
    routeLinkOptions: {
      importLink: {
        from: "src/NextJS/Link",
        defaultImport: "Link",
        namedImports: [{ name: "NextJSLinkProps" }],
      },
      hrefProp: "customHref",
      linkComponent: "Link",
      linkProps: "NextJSLinkProps",
      generateLinkComponent: true,
      generateUseParams: false,
      generateUseRedirect: false,
      mode: "loose",
    },
    routeName: "Login",
    routePattern: "/login",
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
    const [templateFile] = new TypescriptNextJSPlugin({ ...defaultParams }).generate();

    expect(templateFile.filename).toBe("LinkLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import React from 'react'
          import Link, {NextJSLinkProps,} from 'src/NextJS/Link'
          import {UrlParamsLogin,patternNextJSLogin,} from './patternLogin'
          type LinkLoginProps = Omit<NextJSLinkProps, 'customHref'> & { urlParams?: UrlParamsLogin }
          export const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({ urlParams, ...props}) => {
            const { query = {} } = urlParams;
            const path = {};
            const pathname = patternNextJSLogin;
            const nextHref = {
              pathname: pathname,
              query: {
                ...path,
                ...query,
              },
            }
            return <Link {...props} customHref={nextHref} />;
          }"
    `);
  });

  it("should generate correctly with path params", () => {
    const [templateFile] = new TypescriptNextJSPlugin({
      ...defaultParams,
      patternNamedExports: {
        ...defaultParams.patternNamedExports,
        pathParamsInterfaceName: "PathParamsLogin",
        possiblePathParamsVariableName: "possiblePathParamsLogin",
      },
    }).generate();

    expect(templateFile.filename).toBe("LinkLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import React from 'react'
          import Link, {NextJSLinkProps,} from 'src/NextJS/Link'
          import {UrlParamsLogin,patternNextJSLogin,possiblePathParamsLogin,} from './patternLogin'
          type LinkLoginProps = Omit<NextJSLinkProps, 'customHref'> & { urlParams: UrlParamsLogin }
          export const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({ urlParams, ...props}) => {
            const { query = {} } = urlParams;
            const path = urlParams.path;
            const pathname = possiblePathParamsLogin.filter((key) => !(key in path)).reduce((prevPattern, suppliedParam) => prevPattern.replace(\`/[\${suppliedParam}]\`, \\"\\"), patternNextJSLogin);
            const nextHref = {
              pathname: pathname,
              query: {
                ...path,
                ...query,
              },
            }
            return <Link {...props} customHref={nextHref} />;
          }"
    `);
  });

  it("should generate correctly with named component import", () => {
    const [templateFile] = new TypescriptNextJSPlugin({
      ...defaultParams,
      routeLinkOptions: {
        importLink: {
          from: "src/common/Link",
          namedImports: [{ name: "CustomLinkProps" }, { name: "CustomLink", importAs: "Link" }],
        },
        linkComponent: "Link",
        linkProps: "CustomLinkProps",
        hrefProp: "to",
        generateLinkComponent: true,
        generateUseParams: false,
        generateUseRedirect: false,
        mode: "loose",
      },
    }).generate();

    expect(templateFile.filename).toBe("LinkLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import React from 'react'
          import {CustomLinkProps,CustomLink as Link,} from 'src/common/Link'
          import {UrlParamsLogin,patternNextJSLogin,} from './patternLogin'
          type LinkLoginProps = Omit<CustomLinkProps, 'to'> & { urlParams?: UrlParamsLogin }
          export const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({ urlParams, ...props}) => {
            const { query = {} } = urlParams;
            const path = {};
            const pathname = patternNextJSLogin;
            const nextHref = {
              pathname: pathname,
              query: {
                ...path,
                ...query,
              },
            }
            return <Link {...props} to={nextHref} />;
          }"
    `);
  });

  it("should throw error if no patternNameNextJS", () => {
    expect(() =>
      new TypescriptNextJSPlugin({
        ...defaultParams,
        routeLinkOptions: {
          importLink: {
            from: "src/common/Link",
            namedImports: [{ name: "CustomLinkProps" }, { name: "CustomLink", importAs: "Link" }],
          },
          linkComponent: "Link",
          linkProps: "CustomLinkProps",
          hrefProp: "to",
          generateLinkComponent: true,
          generateUseParams: true,
          generateUseRedirect: true,
          mode: "loose",
        },
        patternNamedExports: {
          ...defaultParams.patternNamedExports,
          patternNameNextJS: undefined,
        },
      }).generate()
    ).toThrowError('[ERROR] Missing "patternNameNextJS". This is most likely a problem with route-codegen.');
  });
});

describe("TypescriptNextJSPlugin - UseParams file", () => {
  it("should generate correctly for loose mode", () => {
    const [templateFile] = new TypescriptNextJSPlugin({
      importGenerateUrl: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" },
      patternNamedExports: {
        originName: "originUser",
        filename: "patternUser",
        patternName: "patternUser",
        urlParamsInterfaceName: "UrlParamsUser",
        patternNameNextJS: "patternNextJSUser",
        pathParamsInterfaceNameNextJS: "PathParamsNextJSUser",
      },
      destinationDir: "path/to/routes",
      routeName: "User",
      routePattern: "/users/:id/:subview(profile|pictures)/:singleEnum(only)/:optional?/:optionalEnum(enum1|enum2)?",
      routeLinkOptions: {
        importLink: {
          from: "src/common/Link",
          namedImports: [{ name: "CustomLinkProps" }, { name: "CustomLink", importAs: "Link" }],
        },
        linkComponent: "Link",
        linkProps: "CustomLinkProps",
        hrefProp: "to",
        generateLinkComponent: false,
        generateUseParams: true,
        generateUseRedirect: false,
        mode: "loose",
      },
    }).generate();

    expect(templateFile.filename).toBe("useParamsUser");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import {PathParamsNextJSUser,} from './patternUser'
            import {useRouter,} from 'next/router'
            export const useParamsUser = (): PathParamsNextJSUser => {
              const query = useRouter().query;
              return {id: query.id,subview: query.subview,singleEnum: query.singleEnum,optional: query.optional ? query.optional : undefined,optionalEnum: query.optionalEnum ? query.optionalEnum : undefined,};
            }"
    `);
  });

  it("should generate correctly for strict mode", () => {
    const [templateFile] = new TypescriptNextJSPlugin({
      importGenerateUrl: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" },
      patternNamedExports: {
        originName: "originUser",
        filename: "patternUser",
        patternName: "patternUser",
        urlParamsInterfaceName: "UrlParamsUser",
        patternNameNextJS: "patternNextJSUser",
        pathParamsInterfaceNameNextJS: "PathParamsNextJSUser",
      },
      destinationDir: "path/to/routes",
      routeName: "User",
      routePattern: "/users/:id/:subview(profile|pictures)/:singleEnum(only)/:optional?/:optionalEnum(enum1|enum2)?",
      routeLinkOptions: {
        importLink: {
          from: "src/common/Link",
          namedImports: [{ name: "CustomLinkProps" }, { name: "CustomLink", importAs: "Link" }],
        },
        linkComponent: "Link",
        linkProps: "CustomLinkProps",
        hrefProp: "to",
        generateLinkComponent: false,
        generateUseParams: true,
        generateUseRedirect: false,
        mode: "strict",
      },
    }).generate();

    expect(templateFile.filename).toBe("useParamsUser");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import {PathParamsNextJSUser,} from './patternUser'
            import {useRouter,} from 'next/router'
            export const useParamsUser = (): PathParamsNextJSUser => {
              const query = useRouter().query;
              return {id: query.id as PathParamsNextJSUser[\\"id\\"],
      subview: (() => {
                      const subviewPossibleValues = [\\"profile\\",\\"pictures\\",]
                      if(subviewPossibleValues.findIndex((v) => v === query.subview) === -1){ throw new Error(\\"Unable to match 'subview' with expected enums\\"); }
                      return query.subview as PathParamsNextJSUser[\\"subview\\"]
                    })(),
      singleEnum: (() => {
                      const singleEnumPossibleValues = [\\"only\\",]
                      if(singleEnumPossibleValues.findIndex((v) => v === query.singleEnum) === -1){ throw new Error(\\"Unable to match 'singleEnum' with expected enums\\"); }
                      return query.singleEnum as PathParamsNextJSUser[\\"singleEnum\\"]
                    })(),
      optional: query.optional ? (query.optional as PathParamsNextJSUser[\\"optional\\"]) : undefined,
      optionalEnum: (() => {
                      const optionalEnumPossibleValues = [\\"enum1\\",\\"enum2\\",undefined,]
                      if(optionalEnumPossibleValues.findIndex((v) => v === query.optionalEnum) === -1){ throw new Error(\\"Unable to match 'optionalEnum' with expected enums\\"); }
                      return query.optionalEnum as PathParamsNextJSUser[\\"optionalEnum\\"]
                    })(),};
            }"
    `);
  });
});

describe("TypescriptNextJSPlugin - UseRedirect file", () => {
  it("should generate when there is no pathParams", () => {
    const params: TypescriptNextJSPluginConfig = {
      routeName: "Login",
      routePattern: "/login",
      routeLinkOptions: {
        importLink: {
          from: "src/NextJS/Link",
          defaultImport: "Link",
          namedImports: [{ name: "NextJSLinkProps" }],
        },
        hrefProp: "customHref",
        linkComponent: "Link",
        linkProps: "NextJSLinkProps",
        generateLinkComponent: false,
        generateUseParams: false,
        generateUseRedirect: true,
        mode: "strict",
      },
      patternNamedExports: {
        originName: "originLogin",
        filename: "patternLogin",
        patternName: "patternLogin",
        urlParamsInterfaceName: "UrlParamsLogin",
        patternNameNextJS: "patternNextJSLogin",
      },
      destinationDir: "path/to/routes",
      importGenerateUrl: {
        from: "route-codegen",
        namedImports: [{ name: "generateUrl" }],
      },
    };
    const [templateFile] = new TypescriptNextJSPlugin({ ...params }).generate();
    expect(templateFile.filename).toBe("useRedirectLogin");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import {useRouter,} from 'next/router'
          import {UrlParamsLogin,patternNextJSLogin,} from './patternLogin'
          export type RedirectFnLogin = (urlParams?: UrlParamsLogin) => void;
          export const useRedirectLogin = (): RedirectFnLogin => {
            const router = useRouter();
            const redirect: RedirectFnLogin = urlParams => {
              const query = urlParams?.query ?? {};
              const path = {};
              const pathname = patternNextJSLogin;
              router.push({
                pathname: pathname,
                query: {
                  ...path,
                  ...query,
                },
              })
            }
            return redirect;
          }"
    `);
  });

  it("should generate when there is pathParams", () => {
    const params: TypescriptNextJSPluginConfig = {
      routeName: "UserInfo",
      routePattern: "/user/:id",
      routeLinkOptions: {
        importLink: {
          from: "src/NextJS/Link",
          defaultImport: "Link",
          namedImports: [{ name: "NextJSLinkProps" }],
        },
        hrefProp: "customHref",
        linkComponent: "Link",
        linkProps: "NextJSLinkProps",
        generateLinkComponent: false,
        generateUseParams: false,
        generateUseRedirect: true,
        mode: "strict",
      },
      patternNamedExports: {
        originName: "originUserInfo",
        filename: "patternUserInfo",
        patternName: "patternUserInfo",
        urlParamsInterfaceName: "UrlParamsUserInfo",
        pathParamsInterfaceName: "PathParamsUserInfo",
        patternNameNextJS: "patternNextJSUserInfo",
        possiblePathParamsVariableName: "possiblePathParamsUserInfo",
      },
      destinationDir: "path/to/routes",
      importGenerateUrl: {
        from: "route-codegen",
        namedImports: [{ name: "generateUrl" }],
      },
    };
    const [templateFile] = new TypescriptNextJSPlugin(params).generate();

    expect(templateFile.filename).toBe("useRedirectUserInfo");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import {useRouter,} from 'next/router'
          import {UrlParamsUserInfo,patternNextJSUserInfo,possiblePathParamsUserInfo,} from './patternUserInfo'
          export type RedirectFnUserInfo = (urlParams: UrlParamsUserInfo) => void;
          export const useRedirectUserInfo = (): RedirectFnUserInfo => {
            const router = useRouter();
            const redirect: RedirectFnUserInfo = urlParams => {
              const query = urlParams?.query ?? {};
              const path = urlParams.path;
              const pathname = possiblePathParamsUserInfo.filter((key) => !(key in urlParams.path)).reduce((prevPattern, suppliedParam) => prevPattern.replace(\`/[\${suppliedParam}]\`, \\"\\"), patternNextJSUserInfo);
              router.push({
                pathname: pathname,
                query: {
                  ...path,
                  ...query,
                },
              })
            }
            return redirect;
          }"
    `);
  });
});
