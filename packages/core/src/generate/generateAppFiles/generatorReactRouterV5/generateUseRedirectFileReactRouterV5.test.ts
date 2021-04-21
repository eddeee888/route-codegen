import { generateUseRedirectFileReactRouterV5 } from "./generateUseRedirectFileReactRouterV5";

describe("generateUseRedirectReactRouterV5", () => {
  it("should generate when there is no pathParams", () => {
    const templateFile = generateUseRedirectFileReactRouterV5({
      routeName: "Login",
      patternNamedExports: {
        originName: "originLogin",
        filename: "patternLogin",
        patternName: "patternLogin",
        urlPartsInterfaceName: "UrlPartsLogin",
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
        import {UrlPartsLogin,patternLogin,} from './patternLogin'
        import {generateUrl,} from 'route-codegen'
        export type RedirectFnLogin = (urlParts?: UrlPartsLogin) => void;
        export const useRedirectLogin = (): RedirectFnLogin => {
          const history = useHistory();
          const redirect: RedirectFnLogin = urlParts => {
            const to = generateUrl({ pattern: patternLogin, path: {}, query: urlParts?.query, origin: urlParts?.origin });
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
        urlPartsInterfaceName: "UrlPartsUserInfo",
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
        import {UrlPartsUserInfo,patternUserInfo,} from './patternUserInfo'
        import {generateUrl,} from 'route-codegen'
        export type RedirectFnUserInfo = (urlParts: UrlPartsUserInfo) => void;
        export const useRedirectUserInfo = (): RedirectFnUserInfo => {
          const history = useHistory();
          const redirect: RedirectFnUserInfo = urlParts => {
            const to = generateUrl({ pattern: patternUserInfo, path: urlParts.path, query: urlParts?.query, origin: urlParts?.origin });
            history.push(to);
          }
          return redirect;
        }"
    `);
  });
});
