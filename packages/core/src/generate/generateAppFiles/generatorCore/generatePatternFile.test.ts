import generatePatternFile from "./generatePatternFile";
import { RoutingType } from "../../config";

describe("generatePatternFile", () => {
  describe("Default and ReactRouterV5", () => {
    it("should generate correctly if no dynamic path", () => {
      const [templateFile, interfaceResult] = generatePatternFile({
        origin: "",
        routePattern: "/app/login",
        destinationDir: "path/to/routes",
        routeName: "Login",
        routingType: RoutingType.Default,
        linkOptionModeNextJS: "loose",
      });

      expect(templateFile.filename).toBe("patternLogin");
      expect(templateFile.extension).toBe(".ts");
      expect(templateFile.destinationDir).toBe("path/to/routes");
      expect(templateFile.template).toContain("export const patternLogin = '/app/login'");
      expect(interfaceResult).toEqual({
        originName: "originLogin",
        patternName: "patternLogin",
        urlPartsInterfaceName: "UrlPartsLogin",
        filename: "patternLogin",
      });
    });

    it("should generate correctly for routes with dynamic path", () => {
      const [templateFile, interfaceResult] = generatePatternFile({
        origin: "",
        routePattern: "/app/users/:id/:subview(profile|pictures)",
        destinationDir: "path/to/routes",
        routeName: "UserInfo",
        routingType: RoutingType.Default,
        linkOptionModeNextJS: "loose",
      });

      expect(templateFile.filename).toBe("patternUserInfo");
      expect(templateFile.extension).toBe(".ts");
      expect(templateFile.destinationDir).toBe("path/to/routes");
      expect(templateFile.template).toContain(
        `export const patternUserInfo = '/app/users/:id/:subview(profile|pictures)'
  export const originUserInfo = ''
  
  export type PathParamsUserInfo = {id: string;subview:'profile'|'pictures';}
  
  export const possilePathParamsUserInfo = ['id','subview',]
  export interface UrlPartsUserInfo {
    path: PathParamsUserInfo;
    query?: Record<string, string | undefined>;
    origin?: string;
  }`
      );
      expect(interfaceResult).toEqual({
        originName: "originUserInfo",
        patternName: "patternUserInfo",
        pathParamsInterfaceName: "PathParamsUserInfo",
        urlPartsInterfaceName: "UrlPartsUserInfo",
        filename: "patternUserInfo",
        possiblePathParamsVariableName: "possilePathParamsUserInfo",
      });
    });
  });

  describe("NextJS", () => {
    it("should generate template correctly with loose NextJS pattern", () => {
      const [templateFile, interfaceResult] = generatePatternFile({
        origin: "",
        routePattern: "/app/users/:id/:subview(profile|pictures)/:singleEnum(only)/:optional?/:optionalEnum(enum1|enum2)?",
        destinationDir: "path/to/routes",
        routeName: "UserInfo",
        routingType: RoutingType.NextJS,
        linkOptionModeNextJS: "loose",
      });

      expect(templateFile.filename).toBe("patternUserInfo");
      expect(templateFile.extension).toBe(".ts");
      expect(templateFile.destinationDir).toBe("path/to/routes");
      expect(templateFile.template).toMatchInlineSnapshot(`
        "export const patternUserInfo = '/app/users/:id/:subview(profile|pictures)/:singleEnum(only)/:optional?/:optionalEnum(enum1|enum2)?'
          export const originUserInfo = ''
          /** Recommended file paths:
           * - \\"src/pages/app/users/[id]/[subview]/[singleEnum]/[optional]/[optionalEnum]/index.tsx\\"
           * - \\"pages/app/users/[id]/[subview]/[singleEnum]/[optional]/[optionalEnum]/index.tsx\\"
           */
          export const patternNextJSUserInfo = \\"/app/users/[id]/[subview]/[singleEnum]/[optional]/[optionalEnum]\\"
          export type PathParamsUserInfo = {id: string;subview:'profile'|'pictures';singleEnum:'only';optional?: string;optionalEnum?:'enum1'|'enum2';}
          export interface PathParamsNextJSUserInfo {id: string | string[];subview: string | string[];singleEnum: string | string[];optional?: string | string[];optionalEnum?: string | string[];}
          export const possilePathParamsUserInfo = ['id','subview','singleEnum','optional','optionalEnum',]
          export interface UrlPartsUserInfo {
            path: PathParamsUserInfo;
            query?: Record<string, string | undefined>;
            origin?: string;
          }"
      `);
      expect(interfaceResult).toEqual({
        originName: "originUserInfo",
        patternName: "patternUserInfo",
        patternNameNextJS: "patternNextJSUserInfo",
        pathParamsInterfaceName: "PathParamsUserInfo",
        pathParamsInterfaceNameNextJS: "PathParamsNextJSUserInfo",
        urlPartsInterfaceName: "UrlPartsUserInfo",
        filename: "patternUserInfo",
        possiblePathParamsVariableName: "possilePathParamsUserInfo",
      });
    });

    it("should generate template correctly with strict NextJS pattern", () => {
      const [templateFile, interfaceResult] = generatePatternFile({
        origin: "",
        routePattern: "/app/users/:id/:subview(profile|pictures)/:singleEnum(only)/:optional?/:optionalEnum(enum1|enum2)?",
        destinationDir: "path/to/routes",
        routeName: "UserInfo",
        routingType: RoutingType.NextJS,
        linkOptionModeNextJS: "strict",
      });

      expect(templateFile.filename).toBe("patternUserInfo");
      expect(templateFile.extension).toBe(".ts");
      expect(templateFile.destinationDir).toBe("path/to/routes");
      expect(templateFile.template).toMatchInlineSnapshot(`
        "export const patternUserInfo = '/app/users/:id/:subview(profile|pictures)/:singleEnum(only)/:optional?/:optionalEnum(enum1|enum2)?'
          export const originUserInfo = ''
          /** Recommended file paths:
           * - \\"src/pages/app/users/[id]/[subview]/[singleEnum]/[optional]/[optionalEnum]/index.tsx\\"
           * - \\"pages/app/users/[id]/[subview]/[singleEnum]/[optional]/[optionalEnum]/index.tsx\\"
           */
          export const patternNextJSUserInfo = \\"/app/users/[id]/[subview]/[singleEnum]/[optional]/[optionalEnum]\\"
          export type PathParamsUserInfo = {id: string;subview:'profile'|'pictures';singleEnum:'only';optional?: string;optionalEnum?:'enum1'|'enum2';}
          
          export const possilePathParamsUserInfo = ['id','subview','singleEnum','optional','optionalEnum',]
          export interface UrlPartsUserInfo {
            path: PathParamsUserInfo;
            query?: Record<string, string | undefined>;
            origin?: string;
          }"
      `);
      expect(interfaceResult).toEqual({
        originName: "originUserInfo",
        patternName: "patternUserInfo",
        patternNameNextJS: "patternNextJSUserInfo",
        pathParamsInterfaceName: "PathParamsUserInfo",
        pathParamsInterfaceNameNextJS: undefined,
        urlPartsInterfaceName: "UrlPartsUserInfo",
        filename: "patternUserInfo",
        possiblePathParamsVariableName: "possilePathParamsUserInfo",
      });
    });

    it("should generate template correctly for home page", () => {
      const [templateFile, interfaceResult] = generatePatternFile({
        origin: "",
        routePattern: "/",
        destinationDir: "path/to/routes",
        routeName: "UserInfo",
        routingType: RoutingType.NextJS,
        linkOptionModeNextJS: "strict",
      });

      expect(templateFile.filename).toBe("patternUserInfo");
      expect(templateFile.extension).toBe(".ts");
      expect(templateFile.destinationDir).toBe("path/to/routes");
      expect(templateFile.template).toMatchInlineSnapshot(`
"export const patternUserInfo = '/'
  export const originUserInfo = ''
  /** Recommended file paths:
   * - \\"src/pages/index.tsx\\"
   * - \\"pages/index.tsx\\"
   */
  export const patternNextJSUserInfo = \\"/\\"
  
  
  
  export interface UrlPartsUserInfo {
    
    query?: Record<string, string | undefined>;
    origin?: string;
  }"
`);
      expect(interfaceResult).toEqual({
        originName: "originUserInfo",
        patternName: "patternUserInfo",
        patternNameNextJS: "patternNextJSUserInfo",
        pathParamsInterfaceName: undefined,
        pathParamsInterfaceNameNextJS: undefined,
        urlPartsInterfaceName: "UrlPartsUserInfo",
        filename: "patternUserInfo",
        possiblePathParamsVariableName: undefined,
      });
    });
  });

  describe("Custom origin", () => {
    it("should handle normal origin correctly", () => {
      const [templateFile, interfaceResult] = generatePatternFile({
        origin: "https://sample.domain.com",
        routePattern: "/app/users/:id/:subview(profile|pictures)",
        destinationDir: "path/to/routes",
        routeName: "UserInfo",
        routingType: RoutingType.Default,
        linkOptionModeNextJS: "loose",
      });

      expect(templateFile.filename).toBe("patternUserInfo");
      expect(templateFile.extension).toBe(".ts");
      expect(templateFile.destinationDir).toBe("path/to/routes");
      expect(templateFile.template).toContain(
        `export const patternUserInfo = '/app/users/:id/:subview(profile|pictures)'
  export const originUserInfo = 'https://sample.domain.com'
  
  export type PathParamsUserInfo = {id: string;subview:'profile'|'pictures';}
  
  export const possilePathParamsUserInfo = ['id','subview',]
  export interface UrlPartsUserInfo {
    path: PathParamsUserInfo;
    query?: Record<string, string | undefined>;
    origin?: string;
  }`
      );
      expect(interfaceResult).toEqual({
        originName: "originUserInfo",
        patternName: "patternUserInfo",
        pathParamsInterfaceName: "PathParamsUserInfo",
        urlPartsInterfaceName: "UrlPartsUserInfo",
        filename: "patternUserInfo",
        possiblePathParamsVariableName: "possilePathParamsUserInfo",
      });
    });
  });
});
