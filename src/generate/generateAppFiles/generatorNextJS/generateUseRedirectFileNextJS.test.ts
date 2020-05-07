import generateUseRedirectFileNextJS, { GenerateUseRedirectFileNextJSParams } from "./generateUseRedirectFileNextJS";

describe("generateUseRedirectFileNextJS", () => {
  it("should generate when there is no pathParams", () => {
    const params: GenerateUseRedirectFileNextJSParams = {
      routeName: "Login",
      patternNamedExports: {
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
  export type RedirectLogin = (urlParts: UrlPartsLogin) => void;
  const useRedirectLogin = (): RedirectLogin => {
    const redirect: RedirectLogin = urlParts => {
      const to = generateUrl(patternLogin, {}, urlParts.urlQuery);
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
  export type RedirectUserInfo = (urlParts: UrlPartsUserInfo) => void;
  const useRedirectUserInfo = (): RedirectUserInfo => {
    const redirect: RedirectUserInfo = urlParts => {
      const to = generateUrl(patternUserInfo, urlParts.path, urlParts.urlQuery);
      const url = possiblePathParamsUserInfo.filter((key) => !(key in urlParts.path)).reduce((prevPattern, suppliedParam) => prevPattern.replace(\`/[${"${suppliedParam"}}]\`, ""), patternNextJSUserInfo);
      Router.push(url, to);
    }
    return redirect;
  }
  export default useRedirectUserInfo`);
  });
});
