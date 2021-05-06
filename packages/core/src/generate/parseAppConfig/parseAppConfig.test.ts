import { parseAppConfig } from "./parseAppConfig";
import { AppConfig } from "./types";

describe("parseAppConfig", () => {
  const defaultAppConfig: AppConfig = {
    routes: {
      login: "/login",
      user: "/user/:id",
    },
    destinationDir: "path/to/routes",
  };

  it("should parse minimal config", async () => {
    const parsedConfig = await parseAppConfig({ ...defaultAppConfig });
    expect(parsedConfig).toEqual({
      routes: {
        login: {
          origin: "",
          path: "/login",
          routingType: "route-internal",
        },
        user: {
          origin: "",
          path: "/user/:id",
          routingType: "route-internal",
        },
      },
      destinationDir: "path/to/routes",
      plugins: [],
      context: {
        topLevelGenerateOptions: {
          generateLinkComponent: false,
          generateRedirectComponent: false,
          generateUseParams: false,
          generateUseRedirect: false,
        },
        importGenerateUrl: {
          importedName: "generateUrl",
          import: {
            from: "@route-codegen/utils",
            namedImports: [{ name: "generateUrl" }],
          },
        },
        importRedirectServerSide: {
          importedName: "RedirectServerSide",
          import: {
            from: "@route-codegen/react",
            namedImports: [{ name: "RedirectServerSide" }],
          },
        },
      },
    });
  });

  it("should parse config with custom values", async () => {
    const parsedConfig = await parseAppConfig({
      ...defaultAppConfig,
      origin: "https://joojle.com",
      generate: { linkComponent: true },
      routes: {
        ...defaultAppConfig.routes,
        handbookHome: { origin: "https://handbook.com", path: "/", routingType: "route-external" },
      },
      plugins: [{ name: "typescript-pattern" }],
    });
    expect(parsedConfig).toEqual({
      routes: {
        login: {
          origin: "https://joojle.com",
          path: "/login",
          routingType: "route-internal",
        },
        user: {
          origin: "https://joojle.com",
          path: "/user/:id",
          routingType: "route-internal",
        },
        handbookHome: {
          origin: "https://handbook.com",
          path: "/",
          routingType: "route-external",
        },
      },
      destinationDir: "path/to/routes",
      plugins: [{ name: "typescript-pattern" }],
      context: {
        topLevelGenerateOptions: {
          generateLinkComponent: true,
          generateRedirectComponent: false,
          generateUseParams: false,
          generateUseRedirect: false,
        },
        importGenerateUrl: {
          importedName: "generateUrl",
          import: {
            from: "@route-codegen/utils",
            namedImports: [{ name: "generateUrl" }],
          },
        },
        importRedirectServerSide: {
          importedName: "RedirectServerSide",
          import: {
            from: "@route-codegen/react",
            namedImports: [{ name: "RedirectServerSide" }],
          },
        },
      },
    });
  });
});
