import { generateUseRedirectFileReactRouterV5 } from "./generateUseRedirectFileReactRouterV5";

describe("generateUseRedirectReactRouterV5", () => {
  it("should generate when there is no pathParams", () => {
    const templateFile = generateUseRedirectFileReactRouterV5({
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
    const templateFile = generateUseRedirectFileReactRouterV5({
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
