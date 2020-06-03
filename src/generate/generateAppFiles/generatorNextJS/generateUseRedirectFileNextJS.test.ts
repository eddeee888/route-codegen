import generateUseRedirectFileNextJS, { GenerateUseRedirectFileNextJSParams } from "./generateUseRedirectFileNextJS";

describe("generateUseRedirectFileNextJS", () => {
  it("should generate when there is no pathParams", () => {
    const params: GenerateUseRedirectFileNextJSParams = {
      routeName: "Login",
      patternNamedExports: {
        originName: "originLogin",
        filename: "patternLogin",
        patternName: "patternLogin",
        urlPartsInterfaceName: "UrlPartsLogin",
        patternNameNextJS: "patternNextJSLogin",
      },
      destinationDir: "path/to/routes",
      importGenerateUrl: {
        from: "route-codegen",
        namedImports: [{ name: "generateUrl" }],
      },
    };
    const templateFile = generateUseRedirectFileNextJS({ ...params });
    expect(templateFile.filename).toBe("useRedirectLogin");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toContain(`import Router from 'next/router'
  import {patternLogin,UrlPartsLogin,patternNextJSLogin,} from './patternLogin'
  import {generateUrl,} from 'route-codegen'
  export type RedirectFnLogin = (urlParts?: UrlPartsLogin) => void;
  const useRedirectLogin = (): RedirectFnLogin => {
    const redirect: RedirectFnLogin = urlParts => {
      const to = generateUrl(patternLogin, {}, urlParts?.urlQuery, urlParts?.origin);
      Router.push(patternNextJSLogin, to);
    }
    return redirect;
  }
  export default useRedirectLogin`);
  });

  it("should generate when there is pathParams", () => {
    const params: GenerateUseRedirectFileNextJSParams = {
      routeName: "UserInfo",
      patternNamedExports: {
        originName: "originUserInfo",
        filename: "patternUserInfo",
        patternName: "patternUserInfo",
        urlPartsInterfaceName: "UrlPartsUserInfo",
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
    const templateFile = generateUseRedirectFileNextJS(params);

    expect(templateFile.filename).toBe("useRedirectUserInfo");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toContain(`import Router from 'next/router'
  import {patternUserInfo,UrlPartsUserInfo,patternNextJSUserInfo,possiblePathParamsUserInfo,} from './patternUserInfo'
  import {generateUrl,} from 'route-codegen'
  export type RedirectFnUserInfo = (urlParts: UrlPartsUserInfo) => void;
  const useRedirectUserInfo = (): RedirectFnUserInfo => {
    const redirect: RedirectFnUserInfo = urlParts => {
      const to = generateUrl(patternUserInfo, urlParts.path, urlParts?.urlQuery, urlParts?.origin);
      const url = possiblePathParamsUserInfo.filter((key) => !(key in urlParts.path)).reduce((prevPattern, suppliedParam) => prevPattern.replace(\`/[${"${suppliedParam"}}]\`, ""), patternNextJSUserInfo);
      Router.push(url, to);
    }
    return redirect;
  }
  export default useRedirectUserInfo`);
  });
});
