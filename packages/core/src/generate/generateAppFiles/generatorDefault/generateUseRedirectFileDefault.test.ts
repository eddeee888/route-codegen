import { generateUseRedirectFileDefault } from "./generateUseRedirectFileDefault";

describe("generateUseRedirectFileDefault", () => {
  it("should generate when there is no pathParams", () => {
    const templateFile = generateUseRedirectFileDefault({
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
      "import {UrlPartsLogin,patternLogin,originLogin,} from './patternLogin'
        import {generateUrl,} from 'route-codegen'
        export type RedirectFnLogin = (urlParts?: UrlPartsLogin) => void;
        export const useRedirectLogin = (): RedirectFnLogin => {
          const redirect: RedirectFnLogin = urlParts => {
            const to = generateUrl(patternLogin, { path: {}, query: urlParts?.query, origin: urlParts?.origin ?? originLogin });
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
    const templateFile = generateUseRedirectFileDefault({
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
      "import {UrlPartsUserInfo,patternUserInfo,originLogin,} from './patternUserInfo'
        import {generateUrl,} from 'route-codegen'
        export type RedirectFnUserInfo = (urlParts: UrlPartsUserInfo) => void;
        export const useRedirectUserInfo = (): RedirectFnUserInfo => {
          const redirect: RedirectFnUserInfo = urlParts => {
            const to = generateUrl(patternUserInfo, { path: urlParts.path, query: urlParts?.query, origin: urlParts?.origin ?? originLogin });
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
