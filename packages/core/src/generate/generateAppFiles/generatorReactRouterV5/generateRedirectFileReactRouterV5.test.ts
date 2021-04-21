import { generateRedirectFileReactRouterV5, GenerateRedirectFileReactRouterV5Params } from "./generateRedirectFileReactRouterV5";

describe("generateRedirectFileReactRouterV5", () => {
  const defaultParams: GenerateRedirectFileReactRouterV5Params = {
    importGenerateUrl: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" },
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

  it("should generate correctly if no path params", () => {
    const templateFile = generateRedirectFileReactRouterV5({ ...defaultParams });

    expect(templateFile.filename).toBe("RedirectLogin");
    expect(templateFile.extension).toBe(".tsx");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import React from 'react'
        import {generateUrl,} from 'route-codegen'
        import {Redirect,} from 'react-router'
        import {UrlPartsLogin,patternLogin,} from './patternLogin'
        export const RedirectLogin: React.FunctionComponent<UrlPartsLogin & { fallback?: React.ReactNode }> = props => {
          const to = generateUrl(patternLogin, { path: {}, query: props.query, origin: props.origin);
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
    const templateFile = generateRedirectFileReactRouterV5({
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
        import {UrlPartsLogin,patternLogin,} from './patternLogin'
        export const RedirectLogin: React.FunctionComponent<UrlPartsLogin & { fallback?: React.ReactNode }> = props => {
          const to = generateUrl(patternLogin, { path: props.path, query: props.query, origin: props.origin);
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
