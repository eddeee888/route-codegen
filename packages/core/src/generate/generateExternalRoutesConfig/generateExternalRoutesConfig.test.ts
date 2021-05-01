import generateExternalRoutesConfig from "./generateExternalRoutesConfig";
import { AppConfig } from "../config";

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
      },
      seo: {
        routes: {
          home: "/",
          about: "/about",
          users: "/:id/:subview(profile|pictures)",
        },
        destinationDir: "seo/src/routes",
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
            routingType: "route-external",
          },
          about: {
            origin: "",
            path: "/about",
            routingType: "route-external",
          },
          users: {
            origin: "",
            path: "/:id/:subview(profile|pictures)",
            routingType: "route-external",
          },
          payments: {
            origin: "",
            path: "/payments",
            routingType: "route-external",
          },
          legacyBooks: {
            origin: "https://legacy.domain.com",
            path: "/legacy/books",
            routingType: "route-external",
          },
        },
        destinationDir: "main/src/routes",
      },
      seo: {
        origin: undefined,
        routes: {
          login: {
            origin: "https://app.domain.com",
            path: "/app/login",
            routingType: "route-external",
          },
          signup: {
            origin: "https://app.domain.com",
            path: "/app/signup",
            routingType: "route-external",
          },
          payments: {
            origin: "",
            path: "/payments",
            routingType: "route-external",
          },
          legacyBooks: {
            origin: "https://legacy.domain.com",
            path: "/legacy/books",
            routingType: "route-external",
          },
        },
        destinationDir: "seo/src/routes",
      },
      server: {
        origin: undefined,
        routes: {
          login: {
            origin: "https://app.domain.com",
            path: "/app/login",
            routingType: "route-external",
          },
          signup: {
            origin: "https://app.domain.com",
            path: "/app/signup",
            routingType: "route-external",
          },
          home: {
            origin: "",
            path: "/",
            routingType: "route-external",
          },
          about: {
            origin: "",
            path: "/about",
            routingType: "route-external",
          },
          users: {
            origin: "",
            path: "/:id/:subview(profile|pictures)",
            routingType: "route-external",
          },
          legacyBooks: {
            origin: "https://legacy.domain.com",
            path: "/legacy/books",
            routingType: "route-external",
          },
        },
        destinationDir: "server/src/routes",
      },
      legacy: {
        origin: undefined,
        routes: {
          login: {
            origin: "https://app.domain.com",
            path: "/app/login",
            routingType: "route-external",
          },
          signup: {
            origin: "https://app.domain.com",
            path: "/app/signup",
            routingType: "route-external",
          },
          home: {
            origin: "",
            path: "/",
            routingType: "route-external",
          },
          about: {
            origin: "",
            path: "/about",
            routingType: "route-external",
          },
          users: {
            origin: "",
            path: "/:id/:subview(profile|pictures)",
            routingType: "route-external",
          },
          payments: {
            origin: "",
            path: "/payments",
            routingType: "route-external",
          },
        },
      },
    });
  });
});
