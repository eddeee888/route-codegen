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
  export type RedirectFnLogin = (urlParts?: UrlPartsLogin) => void;
  const useRedirectLogin = (): RedirectFnLogin => {
    const history = useHistory();
    const redirect: RedirectFnLogin = urlParts => {
      const to = generateUrl(patternLogin, {}, urlParts?.urlQuery);
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
  export type RedirectFnUserInfo = (urlParts: UrlPartsUserInfo) => void;
  const useRedirectUserInfo = (): RedirectFnUserInfo => {
    const history = useHistory();
    const redirect: RedirectFnUserInfo = urlParts => {
      const to = generateUrl(patternUserInfo, urlParts.path, urlParts?.urlQuery);
      history.push(to);
    }
    return redirect;
  }
  export default useRedirectUserInfo`);
  });
});
