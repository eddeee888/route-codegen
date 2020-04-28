import generateExternalRoutesConfig from "./generateExternalRoutesConfig";
import { AppConfig, RoutingType } from "../config";

describe("generateExternalRoutesConfig", () => {
  it("should generate external app route objects correctly", () => {
    const apps: Record<string, AppConfig> = {
      main: {
        routes: {
          login: "/app/login",
          signup: "/app/signup",
        },
        destinationDir: "main/src/routes",
        routingType: RoutingType.ReactRouterV5,
      },
      seo: {
        routes: {
          home: "/",
          about: "/about",
          users: "/:id/:subview(profile|pictures)",
        },
        destinationDir: "seo/src/routes",
        routingType: RoutingType.NextJS,
      },
      legacy: {
        routes: {
          legacyBooks: "/legacy/books",
        },
      },
    };

    const externalRoutes = generateExternalRoutesConfig(apps);
    expect(externalRoutes).toStrictEqual({
      main: {
        routes: {
          home: "/",
          about: "/about",
          users: "/:id/:subview(profile|pictures)",
          legacyBooks: "/legacy/books",
        },
        destinationDir: "main/src/routes",
        routingType: RoutingType.Default,
      },
      seo: {
        routes: {
          login: "/app/login",
          signup: "/app/signup",
          legacyBooks: "/legacy/books",
        },
        destinationDir: "seo/src/routes",
        routingType: RoutingType.Default,
      },
      legacy: {
        routes: {
          login: "/app/login",
          signup: "/app/signup",
          home: "/",
          about: "/about",
          users: "/:id/:subview(profile|pictures)",
        },
        routingType: RoutingType.Default,
      },
    });
  });
});
