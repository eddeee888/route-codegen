import { generateUseRedirectFileNextJS, GenerateUseRedirectFileNextJSParams } from "./generateUseRedirectFileNextJS";

describe("generateUseRedirectFileNextJS", () => {
  it("should generate when there is no pathParams", () => {
    const params: GenerateUseRedirectFileNextJSParams = {
      routeName: "Login",
      patternNamedExports: {
        originName: "originLogin",
        filename: "patternLogin",
        patternName: "patternLogin",
        urlParamsInterfaceName: "UrlParamsLogin",
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
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import {useRouter,} from 'next/router'
        import {UrlParamsLogin,patternNextJSLogin,} from './patternLogin'
        export type RedirectFnLogin = (urlParts?: UrlParamsLogin) => void;
        export const useRedirectLogin = (): RedirectFnLogin => {
          const router = useRouter();
          const redirect: RedirectFnLogin = urlParts => {
            const query = urlParts?.query ?? {};
            const path = {};
            const pathname = patternNextJSLogin;
            router.push({
              pathname: pathname,
              query: {
                ...path,
                ...query,
              },
            })
          }
          return redirect;
        }"
    `);
  });

  it("should generate when there is pathParams", () => {
    const params: GenerateUseRedirectFileNextJSParams = {
      routeName: "UserInfo",
      patternNamedExports: {
        originName: "originUserInfo",
        filename: "patternUserInfo",
        patternName: "patternUserInfo",
        urlParamsInterfaceName: "UrlParamsUserInfo",
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
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import {useRouter,} from 'next/router'
        import {UrlParamsUserInfo,patternNextJSUserInfo,possiblePathParamsUserInfo,} from './patternUserInfo'
        export type RedirectFnUserInfo = (urlParts: UrlParamsUserInfo) => void;
        export const useRedirectUserInfo = (): RedirectFnUserInfo => {
          const router = useRouter();
          const redirect: RedirectFnUserInfo = urlParts => {
            const query = urlParts?.query ?? {};
            const path = urlParts.path;
            const pathname = possiblePathParamsUserInfo.filter((key) => !(key in urlParts.path)).reduce((prevPattern, suppliedParam) => prevPattern.replace(\`/[\${suppliedParam}]\`, \\"\\"), patternNextJSUserInfo);
            router.push({
              pathname: pathname,
              query: {
                ...path,
                ...query,
              },
            })
          }
          return redirect;
        }"
    `);
  });
});
