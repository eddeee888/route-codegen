import generateExternalRoutesConfig from "./generateExternalRoutesConfig";
import { AppConfig, RoutingType } from "../config";

describe("generateExternalRoutesConfig", () => {
  it("should generate external app route objects correctly", () => {
    const apps: Record<string, AppConfig> = {
      main: {
        origin: "https://app.domain.com",
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
      server: {
        routes: {
          payments: "/payments",
        },
        destinationDir: "server/src/routes",
      },
      legacy: {
        origin: "https://legacy.domain.com",
        routes: {
          legacyBooks: "/legacy/books",
        },
      },
    };

    const externalRoutes = generateExternalRoutesConfig(apps);
    expect(externalRoutes).toStrictEqual({
      main: {
        origin: undefined,
        routes: {
          home: {
            origin: "",
            path: "/",
          },
          about: {
            origin: "",
            path: "/about",
          },
          users: {
            origin: "",
            path: "/:id/:subview(profile|pictures)",
          },
          payments: {
            origin: "",
            path: "/payments",
          },
          legacyBooks: {
            origin: "https://legacy.domain.com",
            path: "/legacy/books",
          },
        },
        destinationDir: "main/src/routes",
        routingType: RoutingType.Default,
      },
      seo: {
        origin: undefined,
        routes: {
          login: {
            origin: "https://app.domain.com",
            path: "/app/login",
          },
          signup: {
            origin: "https://app.domain.com",
            path: "/app/signup",
          },
          payments: {
            origin: "",
            path: "/payments",
          },
          legacyBooks: {
            origin: "https://legacy.domain.com",
            path: "/legacy/books",
          },
        },
        destinationDir: "seo/src/routes",
        routingType: RoutingType.Default,
      },
      server: {
        origin: undefined,
        routes: {
          login: {
            origin: "https://app.domain.com",
            path: "/app/login",
          },
          signup: {
            origin: "https://app.domain.com",
            path: "/app/signup",
          },
          home: {
            origin: "",
            path: "/",
          },
          about: {
            origin: "",
            path: "/about",
          },
          users: {
            origin: "",
            path: "/:id/:subview(profile|pictures)",
          },
          legacyBooks: {
            origin: "https://legacy.domain.com",
            path: "/legacy/books",
          },
        },
        destinationDir: "server/src/routes",
        routingType: RoutingType.Default,
      },
      legacy: {
        origin: undefined,
        routes: {
          login: {
            origin: "https://app.domain.com",
            path: "/app/login",
          },
          signup: {
            origin: "https://app.domain.com",
            path: "/app/signup",
          },
          home: {
            origin: "",
            path: "/",
          },
          about: {
            origin: "",
            path: "/about",
          },
          users: {
            origin: "",
            path: "/:id/:subview(profile|pictures)",
          },
          payments: {
            origin: "",
            path: "/payments",
          },
        },
        routingType: RoutingType.Default,
      },
    });
  });
});
