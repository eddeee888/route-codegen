import { plugin, TypescriptNextJSPluginConfig } from "./TypescriptNextJSPlugin";

describe("TypescriptNextJSPlugin - Link file", () => {
  const defaultParams: TypescriptNextJSPluginConfig = {
    appName: "nextjs-app",
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
    extraConfig: {
      importCustomLink: {
        from: "src/NextJS/Link",
        componentDefaultImport: true,
        propsNamedImport: "NextJSLinkProps",
        hrefProp: "customHref",
      },
      generate: {
        linkComponent: true,
        useParams: false,
        useRedirect: false,
      },
      mode: "loose",
    },
    routeName: "Login",
    routePattern: "/login",
    patternNamedExports: {
      originName: "originLogin",
      filename: "patternLogin",
      patternName: "patternLogin",
      urlParamsInterfaceName: "UrlParamsLogin",
    },
    destinationDir: "path/to/routes",
  };

  it("should generate correctly if no path params", () => {
    const [templateFile] = plugin.generate({ ...defaultParams });

    expect(templateFile.filename).toBe("LinkLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import React from 'react'
          import Link, {NextJSLinkProps,} from 'src/NextJS/Link'
          import {generateUrl,} from 'route-codegen'
          import {UrlParamsLogin,patternLogin,} from './patternLogin'
          type LinkLoginProps = Omit<NextJSLinkProps, 'customHref'> & { urlParams?: UrlParamsLogin }
          export const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({ urlParams, ...props}) => {
            const href = generateUrl(patternLogin, { path: {}, query: urlParams?.query, origin: urlParams?.origin });
            return <Link {...props} customHref={href} />;
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
          import Link, {NextJSLinkProps,} from 'src/NextJS/Link'
          import {generateUrl,} from 'route-codegen'
          import {UrlParamsLogin,patternLogin,} from './patternLogin'
          type LinkLoginProps = Omit<NextJSLinkProps, 'customHref'> & { urlParams: UrlParamsLogin }
          export const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({ urlParams, ...props}) => {
            const href = generateUrl(patternLogin, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin });
            return <Link {...props} customHref={href} />;
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
          useParams: false,
          useRedirect: false,
        },
        mode: "loose",
      },
    });

    expect(templateFile.filename).toBe("LinkLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import React from 'react'
          import {CustomLinkProps,CustomLink as Link,} from 'src/common/Link'
          import {generateUrl,} from 'route-codegen'
          import {UrlParamsLogin,patternLogin,} from './patternLogin'
          type LinkLoginProps = Omit<CustomLinkProps, 'to'> & { urlParams?: UrlParamsLogin }
          export const LinkLogin: React.FunctionComponent<LinkLoginProps> = ({ urlParams, ...props}) => {
            const href = generateUrl(patternLogin, { path: {}, query: urlParams?.query, origin: urlParams?.origin });
            return <Link {...props} to={href} />;
          }"
    `);
  });
});

describe("TypescriptNextJSPlugin - UseParams file", () => {
  it("should generate correctly for loose mode", () => {
    const [templateFile] = plugin.generate({
      appName: "nextjs-app",
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
        originName: "originUser",
        filename: "patternUser",
        patternName: "patternUser",
        urlParamsInterfaceName: "UrlParamsUser",
        pathParamsInterfaceName: "PathParamsUser",
      },
      destinationDir: "path/to/routes",
      routeName: "User",
      routePattern: "/users/:id/:subview(profile|pictures)/:singleEnum(only)/:optional?/:optionalEnum(enum1|enum2)?",
      extraConfig: {
        importCustomLink: {
          from: "src/common/Link",
          componentNamedImport: "CustomLink",
          propsNamedImport: "CustomLinkProps",
          hrefProp: "to",
        },
        generate: {
          linkComponent: false,
          useParams: true,
          useRedirect: false,
        },
        mode: "loose",
      },
    });

    expect(templateFile.filename).toBe("useParamsUser");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import {useRouter,} from 'next/router'
            
            interface PathParamsNextJSUser {id: string | string[];subview: string | string[];singleEnum: string | string[];optional?: string | string[];optionalEnum?: string | string[];}
            export const useParamsUser = (): PathParamsNextJSUser => {
              const query = useRouter().query;
              return {id: query.id ?? '',subview: query.subview ?? '',singleEnum: query.singleEnum ?? '',optional: query.optional ? query.optional : undefined,optionalEnum: query.optionalEnum ? query.optionalEnum : undefined,};
            }"
    `);
  });

  it("should generate correctly for strict mode", () => {
    const [templateFile] = plugin.generate({
      appName: "nextjs-app",
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
      patternNamedExports: {
        originName: "originUser",
        filename: "patternUser",
        patternName: "patternUser",
        urlParamsInterfaceName: "UrlParamsUser",
        pathParamsInterfaceName: "PathParamsUser",
      },
      destinationDir: "path/to/routes",
      routeName: "User",
      routePattern: "/users/:id/:subview(profile|pictures)/:singleEnum(only)/:optional?/:optionalEnum(enum1|enum2)?",
      extraConfig: {
        importCustomLink: {
          from: "src/common/Link",
          componentNamedImport: "CustomLink",
          propsNamedImport: "CustomLinkProps",
          hrefProp: "to",
        },
        generate: {
          linkComponent: false,
          useParams: true,
          useRedirect: false,
        },
        mode: "strict",
      },
    });

    expect(templateFile.filename).toBe("useParamsUser");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import {useRouter,} from 'next/router'
            import {PathParamsUser,} from './patternUser'
            
            export const useParamsUser = (): PathParamsUser => {
              const query = useRouter().query;
              return {id: query.id as PathParamsUser[\\"id\\"],
      subview: (() => {
                      const subviewPossibleValues = [\\"profile\\",\\"pictures\\",]
                      if(subviewPossibleValues.findIndex((v) => v === query.subview) === -1){ throw new Error(\\"Unable to match 'subview' with expected enums\\"); }
                      return query.subview as PathParamsUser[\\"subview\\"]
                    })(),
      singleEnum: (() => {
                      const singleEnumPossibleValues = [\\"only\\",]
                      if(singleEnumPossibleValues.findIndex((v) => v === query.singleEnum) === -1){ throw new Error(\\"Unable to match 'singleEnum' with expected enums\\"); }
                      return query.singleEnum as PathParamsUser[\\"singleEnum\\"]
                    })(),
      optional: query.optional ? (query.optional as PathParamsUser[\\"optional\\"]) : undefined,
      optionalEnum: (() => {
                      const optionalEnumPossibleValues = [\\"enum1\\",\\"enum2\\",undefined,]
                      if(optionalEnumPossibleValues.findIndex((v) => v === query.optionalEnum) === -1){ throw new Error(\\"Unable to match 'optionalEnum' with expected enums\\"); }
                      return query.optionalEnum as PathParamsUser[\\"optionalEnum\\"]
                    })(),};
            }"
    `);
  });
});

describe("TypescriptNextJSPlugin - UseRedirect file", () => {
  it("should generate when there is no pathParams", () => {
    const params: TypescriptNextJSPluginConfig = {
      appName: "nextjs-app",
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
      routeName: "Login",
      routePattern: "/login",
      extraConfig: {
        importCustomLink: {
          from: "src/NextJS/Link",
          componentDefaultImport: true,
          propsNamedImport: "NextJSLinkProps",
          hrefProp: "customHref",
        },
        generate: {
          linkComponent: false,
          useParams: false,
          useRedirect: true,
        },
        mode: "strict",
      },
      patternNamedExports: {
        originName: "originLogin",
        filename: "patternLogin",
        patternName: "patternLogin",
        urlParamsInterfaceName: "UrlParamsLogin",
      },
      destinationDir: "path/to/routes",
    };
    const [templateFile] = plugin.generate({ ...params });
    expect(templateFile.filename).toBe("useRedirectLogin");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import {useRouter,} from 'next/router'
          import {generateUrl,} from 'route-codegen'
          import {UrlParamsLogin,patternLogin,} from './patternLogin'
          export type RedirectFnLogin = (urlParams?: UrlParamsLogin) => void;
          export const useRedirectLogin = (): RedirectFnLogin => {
            const router = useRouter();
            const redirect: RedirectFnLogin = (urlParams) => {
              const href = generateUrl(patternLogin, { path: {}, query: urlParams?.query, origin: urlParams?.origin });
              router.push(href);
            }
            return redirect;
          }"
    `);
  });

  it("should generate when there is pathParams", () => {
    const params: TypescriptNextJSPluginConfig = {
      appName: "next-js-app",
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
      routePattern: "/user/:id",
      extraConfig: {
        importCustomLink: {
          from: "src/NextJS/Link",
          componentDefaultImport: true,
          propsNamedImport: "NextJSLinkProps",
          hrefProp: "customHref",
        },
        generate: {
          linkComponent: false,
          useParams: false,
          useRedirect: true,
        },
        mode: "strict",
      },
      patternNamedExports: {
        originName: "originUserInfo",
        filename: "patternUserInfo",
        patternName: "patternUserInfo",
        urlParamsInterfaceName: "UrlParamsUserInfo",
        pathParamsInterfaceName: "PathParamsUserInfo",
      },
      destinationDir: "path/to/routes",
    };
    const [templateFile] = plugin.generate({ ...params });

    expect(templateFile.filename).toBe("useRedirectUserInfo");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import {useRouter,} from 'next/router'
          import {generateUrl,} from 'route-codegen'
          import {UrlParamsUserInfo,patternUserInfo,} from './patternUserInfo'
          export type RedirectFnUserInfo = (urlParams: UrlParamsUserInfo) => void;
          export const useRedirectUserInfo = (): RedirectFnUserInfo => {
            const router = useRouter();
            const redirect: RedirectFnUserInfo = (urlParams) => {
              const href = generateUrl(patternUserInfo, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin });
              router.push(href);
            }
            return redirect;
          }"
    `);
  });
});
