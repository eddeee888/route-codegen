import generateUseRedirectReactRouterV5 from "./generateUseRedirectReactRouterV5";

describe("generateUseRedirectReactRouterV5", () => {
  it("should generate when there is no pathParams", () => {
    const templateFile = generateUseRedirectReactRouterV5({
      routeName: "Login",
      patternNamedExports: {
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
    expect(templateFile.template).toContain(`import {useHistory,} from 'react-router'
  import {UrlPartsLogin,patternLogin,} from './patternLogin'
  import {generateUrl,} from 'route-codegen'
  export type RedirectLogin = (urlParts: UrlPartsLogin) => void;
  const useRedirectLogin = (): RedirectLogin => {
    const history = useHistory();
    const redirect: RedirectLogin = urlParts => {
      const to = generateUrl(patternLogin, {}, urlParts.urlQuery);
      history.push(to);
    }
    return redirect;
  }
  export default useRedirectLogin`);
  });

  it("should generate when there is pathParams", () => {
    const templateFile = generateUseRedirectReactRouterV5({
      routeName: "UserInfo",
      patternNamedExports: {
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
    expect(templateFile.template).toContain(`import {useHistory,} from 'react-router'
  import {UrlPartsUserInfo,patternUserInfo,} from './patternUserInfo'
  import {generateUrl,} from 'route-codegen'
  export type RedirectUserInfo = (urlParts: UrlPartsUserInfo) => void;
  const useRedirectUserInfo = (): RedirectUserInfo => {
    const history = useHistory();
    const redirect: RedirectUserInfo = urlParts => {
      const to = generateUrl(patternUserInfo, urlParts.path, urlParts.urlQuery);
      history.push(to);
    }
    return redirect;
  }
  export default useRedirectUserInfo`);
  });
});
