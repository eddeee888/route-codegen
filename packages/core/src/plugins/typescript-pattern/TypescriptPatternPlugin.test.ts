import { plugin } from "./TypescriptPatternPlugin";

describe("TypescriptPatternPlugin", () => {
  describe("No origin", () => {
    it("should generate correctly if no dynamic path", () => {
      const templateFile = plugin.generate({
        origin: "",
        routingType: "route-internal",
        routePattern: "/app/login",
        destinationDir: "path/to/routes",
        routeName: "Login",
      });

      expect(templateFile.type).toBe("pattern");
      expect(templateFile.hasDefaultExport).toBe(false);
      expect(templateFile.hasNamedExports).toBe(true);
      expect(templateFile.routeName).toBe("Login");
      expect(templateFile.routingType).toBe("route-internal");
      expect(templateFile.filename).toBe("patternLogin");
      expect(templateFile.extension).toBe(".ts");
      expect(templateFile.destinationDir).toBe("path/to/routes");
      expect(templateFile.template).toContain("export const patternLogin = '/app/login'");
      expect(templateFile.namedExports).toEqual({
        originName: "originLogin",
        patternName: "patternLogin",
        urlParamsInterfaceName: "UrlParamsLogin",
        filename: "patternLogin",
      });
    });

    it("should generate correctly for routes with dynamic path", () => {
      const templateFile = plugin.generate({
        routingType: "route-internal",
        origin: "",
        routePattern: "/app/users/:id/:subview(profile|pictures)",
        destinationDir: "path/to/routes",
        routeName: "UserInfo",
      });

      expect(templateFile.type).toBe("pattern");
      expect(templateFile.hasDefaultExport).toBe(false);
      expect(templateFile.hasNamedExports).toBe(true);
      expect(templateFile.routeName).toBe("UserInfo");
      expect(templateFile.routingType).toBe("route-internal");
      expect(templateFile.filename).toBe("patternUserInfo");
      expect(templateFile.extension).toBe(".ts");
      expect(templateFile.destinationDir).toBe("path/to/routes");
      expect(templateFile.template).toMatchInlineSnapshot(`
        "export const patternUserInfo = '/app/users/:id/:subview(profile|pictures)'
            export const originUserInfo = ''
            export type PathParamsUserInfo = {id: string;subview:'profile'|'pictures';}
            export interface UrlParamsUserInfo {
              path: PathParamsUserInfo;
              query?: Record<string, string | undefined>;
              origin?: string;
            }"
      `);
      expect(templateFile.namedExports).toEqual({
        originName: "originUserInfo",
        patternName: "patternUserInfo",
        pathParamsInterfaceName: "PathParamsUserInfo",
        urlParamsInterfaceName: "UrlParamsUserInfo",
        filename: "patternUserInfo",
      });
    });
  });

  describe("Custom origin", () => {
    it("should handle normal origin correctly", () => {
      const templateFile = plugin.generate({
        routingType: "route-external",
        origin: "https://sample.domain.com",
        routePattern: "/app/users/:id/:subview(profile|pictures)",
        destinationDir: "path/to/routes",
        routeName: "UserInfo",
      });

      expect(templateFile.type).toBe("pattern");
      expect(templateFile.hasDefaultExport).toBe(false);
      expect(templateFile.hasNamedExports).toBe(true);
      expect(templateFile.routeName).toBe("UserInfo");
      expect(templateFile.routingType).toBe("route-external");
      expect(templateFile.filename).toBe("patternUserInfo");
      expect(templateFile.extension).toBe(".ts");
      expect(templateFile.destinationDir).toBe("path/to/routes");
      expect(templateFile.template).toMatchInlineSnapshot(`
        "export const patternUserInfo = '/app/users/:id/:subview(profile|pictures)'
            export const originUserInfo = 'https://sample.domain.com'
            export type PathParamsUserInfo = {id: string;subview:'profile'|'pictures';}
            export interface UrlParamsUserInfo {
              path: PathParamsUserInfo;
              query?: Record<string, string | undefined>;
              origin?: string;
            }"
      `);
      expect(templateFile.namedExports).toEqual({
        originName: "originUserInfo",
        patternName: "patternUserInfo",
        pathParamsInterfaceName: "PathParamsUserInfo",
        urlParamsInterfaceName: "UrlParamsUserInfo",
        filename: "patternUserInfo",
      });
    });
  });
});
