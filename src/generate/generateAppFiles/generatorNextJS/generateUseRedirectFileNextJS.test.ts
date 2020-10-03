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
    expect(templateFile.template).toContain(`import {useRouter,} from 'next/router'
  import {UrlPartsLogin,patternNextJSLogin,} from './patternLogin'
  export type RedirectFnLogin = (urlParts?: UrlPartsLogin) => void;
  const useRedirectLogin = (): RedirectFnLogin => {
    const router = useRouter();
    const redirect: RedirectFnLogin = urlParts => {
      const query = urlParts?.urlQuery ?? {};
      const path = {};
      router.push({
        pathname: patternNextJSLogin,
        query: {
          ...path,
          ...query,
        },
      })
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
    expect(templateFile.template).toContain(`import {useRouter,} from 'next/router'
  import {UrlPartsUserInfo,patternNextJSUserInfo,} from './patternUserInfo'
  export type RedirectFnUserInfo = (urlParts: UrlPartsUserInfo) => void;
  const useRedirectUserInfo = (): RedirectFnUserInfo => {
    const router = useRouter();
    const redirect: RedirectFnUserInfo = urlParts => {
      const query = urlParts?.urlQuery ?? {};
      const path = urlParts.path;
      router.push({
        pathname: patternNextJSUserInfo,
        query: {
          ...path,
          ...query,
        },
      })
    }
    return redirect;
  }
  export default useRedirectUserInfo`);
  });
});
