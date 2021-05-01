import generateAppFiles from "./generateAppFiles";
import { AppConfig } from "../config";

// Only test `destinationDir`, `filename` and `extension here` i.e. values needed to generate files.
// Templates should be unit tested in their own plugins
describe("generateAppFiles", () => {
  const appConfig: AppConfig = {
    routes: {
      login: "/login",
      user: "/user/:id",
    },
    destinationDir: "path/to/routes",
  };

  describe("general config", () => {
    it("should not generate any file if no destinationDir", async () => {
      const files = await generateAppFiles("testApp", {
        ...appConfig,
        destinationDir: undefined,
        plugins: [{ name: "typescript-pattern" }],
      });
      expect(files).toHaveLength(0);
    });

    it("should not generate Link if not needed", async () => {
      const files = await generateAppFiles("testApp", {
        ...appConfig,
        generate: {
          redirectComponent: true,
          useParams: true,
          useRedirect: true,
          linkComponent: false,
        },
        plugins: [{ name: "typescript-pattern" }, { name: "typescript-generate-url" }, { name: "typescript-react-router-5" }],
      });

      expect(files).toHaveLength(9);
      expect(files[0].destinationDir).toEqual("path/to/routes/login");
      expect(files[0].filename).toEqual("patternLogin");
      expect(files[0].extension).toEqual(".ts");
      expect(files[1].destinationDir).toEqual("path/to/routes/login");
      expect(files[1].filename).toEqual("generateUrlLogin");
      expect(files[1].extension).toEqual(".ts");
      expect(files[2].destinationDir).toEqual("path/to/routes/login");
      expect(files[2].filename).toEqual("useRedirectLogin");
      expect(files[2].extension).toEqual(".ts");
      expect(files[3].destinationDir).toEqual("path/to/routes/login");
      expect(files[3].filename).toEqual("RedirectLogin");
      expect(files[3].extension).toEqual(".tsx");

      expect(files[4].destinationDir).toEqual("path/to/routes/user");
      expect(files[4].filename).toEqual("patternUser");
      expect(files[4].extension).toEqual(".ts");
      expect(files[5].destinationDir).toEqual("path/to/routes/user");
      expect(files[5].filename).toEqual("generateUrlUser");
      expect(files[5].extension).toEqual(".ts");
      expect(files[6].destinationDir).toEqual("path/to/routes/user");
      expect(files[6].filename).toEqual("useParamsUser");
      expect(files[6].extension).toEqual(".ts");
      expect(files[7].destinationDir).toEqual("path/to/routes/user");
      expect(files[7].filename).toEqual("useRedirectUser");
      expect(files[7].extension).toEqual(".ts");
      expect(files[8].destinationDir).toEqual("path/to/routes/user");
      expect(files[8].filename).toEqual("RedirectUser");
      expect(files[8].extension).toEqual(".tsx");
    });

    it("should generate root index file", async () => {
      const files = await generateAppFiles("testApp", {
        ...appConfig,
        generate: {
          linkComponent: false,
          redirectComponent: false,
          useParams: false,
          useRedirect: false,
        },
        plugins: [
          { name: "typescript-pattern" },
          { name: "typescript-generate-url" },
          { name: "typescript-react-router-5" },
          { name: "typescript-anchor" },
          { name: "typescript-root-index" },
        ],
      });
      expect(files).toHaveLength(5);
      expect(files[0].destinationDir).toEqual("path/to/routes/login");
      expect(files[0].filename).toEqual("patternLogin");
      expect(files[0].extension).toEqual(".ts");
      expect(files[1].destinationDir).toEqual("path/to/routes/login");
      expect(files[1].filename).toEqual("generateUrlLogin");
      expect(files[1].extension).toEqual(".ts");
      expect(files[2].destinationDir).toEqual("path/to/routes/user");
      expect(files[2].filename).toEqual("patternUser");
      expect(files[2].extension).toEqual(".ts");
      expect(files[3].destinationDir).toEqual("path/to/routes/user");
      expect(files[3].filename).toEqual("generateUrlUser");
      expect(files[3].extension).toEqual(".ts");
      expect(files[4].destinationDir).toEqual("path/to/routes");
      expect(files[4].filename).toEqual("index");
      expect(files[4].extension).toEqual(".ts");
      expect(files[4].template).toMatchInlineSnapshot(
        `"export * from \\"./login/patternLogin\\";export * from \\"./login/generateUrlLogin\\";export * from \\"./user/patternUser\\";export * from \\"./user/generateUrlUser\\";"`
      );
    });
  });

  describe("Default", () => {
    it("should generate files", async () => {
      const files = await generateAppFiles("testApp", {
        ...appConfig,
        routes: {
          login: {
            path: "/login",
            origin: "",
            routingType: "route-external",
          },
          user: {
            path: "/user/:id",
            origin: "",
            routingType: "route-external",
          },
        },
        generate: {
          linkComponent: true,
          redirectComponent: true,
          useParams: true,
          useRedirect: true,
        },
        plugins: [{ name: "typescript-pattern" }, { name: "typescript-generate-url" }, { name: "typescript-anchor" }],
      });

      expect(files).toHaveLength(10);
      expect(files[0].destinationDir).toEqual("path/to/routes/login");
      expect(files[0].filename).toEqual("patternLogin");
      expect(files[0].extension).toEqual(".ts");
      expect(files[1].destinationDir).toEqual("path/to/routes/login");
      expect(files[1].filename).toEqual("generateUrlLogin");
      expect(files[1].extension).toEqual(".ts");
      expect(files[2].destinationDir).toEqual("path/to/routes/login");
      expect(files[2].filename).toEqual("LinkLogin");
      expect(files[2].extension).toEqual(".tsx");
      expect(files[3].destinationDir).toEqual("path/to/routes/login");
      expect(files[3].filename).toEqual("useRedirectLogin");
      expect(files[3].extension).toEqual(".ts");
      expect(files[4].destinationDir).toEqual("path/to/routes/login");
      expect(files[4].filename).toEqual("RedirectLogin");
      expect(files[4].extension).toEqual(".tsx");

      expect(files[5].destinationDir).toEqual("path/to/routes/user");
      expect(files[5].filename).toEqual("patternUser");
      expect(files[5].extension).toEqual(".ts");
      expect(files[6].destinationDir).toEqual("path/to/routes/user");
      expect(files[6].filename).toEqual("generateUrlUser");
      expect(files[6].extension).toEqual(".ts");
      expect(files[7].destinationDir).toEqual("path/to/routes/user");
      expect(files[7].filename).toEqual("LinkUser");
      expect(files[7].extension).toEqual(".tsx");
      expect(files[8].destinationDir).toEqual("path/to/routes/user");
      expect(files[8].filename).toEqual("useRedirectUser");
      expect(files[8].extension).toEqual(".ts");
      expect(files[9].destinationDir).toEqual("path/to/routes/user");
      expect(files[9].filename).toEqual("RedirectUser");
      expect(files[9].extension).toEqual(".tsx");
    });
  });

  describe("NextJS", () => {
    it("should generate files", async () => {
      const files = await generateAppFiles("testApp", {
        ...appConfig,
        generate: {
          linkComponent: true,
          useParams: true,
          redirectComponent: true,
          useRedirect: true,
        },
        plugins: [
          { name: "typescript-pattern" },
          { name: "typescript-generate-url" },
          { name: "typescript-next-js" },
          { name: "typescript-anchor" },
        ],
      });

      expect(files).toHaveLength(9);
      expect(files[0].destinationDir).toEqual("path/to/routes/login");
      expect(files[0].filename).toEqual("patternLogin");
      expect(files[0].extension).toEqual(".ts");
      expect(files[1].destinationDir).toEqual("path/to/routes/login");
      expect(files[1].filename).toEqual("generateUrlLogin");
      expect(files[1].extension).toEqual(".ts");
      expect(files[2].destinationDir).toEqual("path/to/routes/login");
      expect(files[2].filename).toEqual("LinkLogin");
      expect(files[2].extension).toEqual(".tsx");
      expect(files[3].destinationDir).toEqual("path/to/routes/login");
      expect(files[3].filename).toEqual("useRedirectLogin");
      expect(files[3].extension).toEqual(".ts");

      expect(files[4].destinationDir).toEqual("path/to/routes/user");
      expect(files[4].filename).toEqual("patternUser");
      expect(files[4].extension).toEqual(".ts");
      expect(files[5].destinationDir).toEqual("path/to/routes/user");
      expect(files[5].filename).toEqual("generateUrlUser");
      expect(files[5].extension).toEqual(".ts");
      expect(files[6].destinationDir).toEqual("path/to/routes/user");
      expect(files[6].filename).toEqual("LinkUser");
      expect(files[6].extension).toEqual(".tsx");
      expect(files[7].destinationDir).toEqual("path/to/routes/user");
      expect(files[7].filename).toEqual("useParamsUser");
      expect(files[7].extension).toEqual(".ts");
      expect(files[8].destinationDir).toEqual("path/to/routes/user");
      expect(files[8].filename).toEqual("useRedirectUser");
      expect(files[8].extension).toEqual(".ts");
    });
  });

  describe("ReactRouterV5", () => {
    it("should generate files", async () => {
      const files = await generateAppFiles("testApp", {
        ...appConfig,
        generate: {
          linkComponent: true,
          useRedirect: true,
          redirectComponent: true,
          useParams: true,
        },
        plugins: [
          { name: "typescript-pattern" },
          { name: "typescript-generate-url" },
          { name: "typescript-react-router-5" },
          { name: "typescript-anchor" },
        ],
      });

      expect(files).toHaveLength(11);
      expect(files[0].destinationDir).toEqual("path/to/routes/login");
      expect(files[0].filename).toEqual("patternLogin");
      expect(files[0].extension).toEqual(".ts");
      expect(files[1].destinationDir).toEqual("path/to/routes/login");
      expect(files[1].filename).toEqual("generateUrlLogin");
      expect(files[1].extension).toEqual(".ts");
      expect(files[2].destinationDir).toEqual("path/to/routes/login");
      expect(files[2].filename).toEqual("LinkLogin");
      expect(files[2].extension).toEqual(".tsx");
      expect(files[3].destinationDir).toEqual("path/to/routes/login");
      expect(files[3].filename).toEqual("useRedirectLogin");
      expect(files[3].extension).toEqual(".ts");
      expect(files[4].destinationDir).toEqual("path/to/routes/login");
      expect(files[4].filename).toEqual("RedirectLogin");
      expect(files[4].extension).toEqual(".tsx");

      expect(files[5].destinationDir).toEqual("path/to/routes/user");
      expect(files[5].filename).toEqual("patternUser");
      expect(files[5].extension).toEqual(".ts");
      expect(files[6].destinationDir).toEqual("path/to/routes/user");
      expect(files[6].filename).toEqual("generateUrlUser");
      expect(files[6].extension).toEqual(".ts");
      expect(files[7].destinationDir).toEqual("path/to/routes/user");
      expect(files[7].filename).toEqual("LinkUser");
      expect(files[7].extension).toEqual(".tsx");
      expect(files[8].destinationDir).toEqual("path/to/routes/user");
      expect(files[8].filename).toEqual("useParamsUser");
      expect(files[8].extension).toEqual(".ts");
      expect(files[9].destinationDir).toEqual("path/to/routes/user");
      expect(files[9].filename).toEqual("useRedirectUser");
      expect(files[9].extension).toEqual(".ts");
      expect(files[10].destinationDir).toEqual("path/to/routes/user");
      expect(files[10].filename).toEqual("RedirectUser");
      expect(files[10].extension).toEqual(".tsx");
    });

    it("should not generate useParams if not needed", async () => {
      const files = await generateAppFiles("testApp", {
        ...appConfig,
        plugins: [
          { name: "typescript-pattern" },
          { name: "typescript-generate-url" },
          {
            name: "typescript-react-router-5",
            config: {
              generate: {
                linkComponent: true,
                redirectComponent: true,
                useRedirect: true,
                useParams: false,
              },
            },
          },
          { name: "typescript-anchor" },
        ],
      });

      expect(files).toHaveLength(10);
      expect(files[0].destinationDir).toEqual("path/to/routes/login");
      expect(files[0].filename).toEqual("patternLogin");
      expect(files[0].extension).toEqual(".ts");
      expect(files[1].destinationDir).toEqual("path/to/routes/login");
      expect(files[1].filename).toEqual("generateUrlLogin");
      expect(files[1].extension).toEqual(".ts");
      expect(files[2].destinationDir).toEqual("path/to/routes/login");
      expect(files[2].filename).toEqual("LinkLogin");
      expect(files[2].extension).toEqual(".tsx");
      expect(files[3].destinationDir).toEqual("path/to/routes/login");
      expect(files[3].filename).toEqual("useRedirectLogin");
      expect(files[3].extension).toEqual(".ts");
      expect(files[4].destinationDir).toEqual("path/to/routes/login");
      expect(files[4].filename).toEqual("RedirectLogin");
      expect(files[4].extension).toEqual(".tsx");

      expect(files[5].destinationDir).toEqual("path/to/routes/user");
      expect(files[5].filename).toEqual("patternUser");
      expect(files[5].extension).toEqual(".ts");
      expect(files[6].destinationDir).toEqual("path/to/routes/user");
      expect(files[6].filename).toEqual("generateUrlUser");
      expect(files[6].extension).toEqual(".ts");
      expect(files[7].destinationDir).toEqual("path/to/routes/user");
      expect(files[7].filename).toEqual("LinkUser");
      expect(files[7].extension).toEqual(".tsx");
      expect(files[8].destinationDir).toEqual("path/to/routes/user");
      expect(files[8].filename).toEqual("useRedirectUser");
      expect(files[8].extension).toEqual(".ts");
      expect(files[9].destinationDir).toEqual("path/to/routes/user");
      expect(files[9].filename).toEqual("RedirectUser");
      expect(files[9].extension).toEqual(".tsx");
    });

    it("should not generate useRedirect if not needed", async () => {
      const files = await generateAppFiles("testApp", {
        ...appConfig,
        plugins: [
          { name: "typescript-pattern" },
          { name: "typescript-generate-url" },
          {
            name: "typescript-react-router-5",
            config: {
              generate: {
                linkComponent: true,
                redirectComponent: true,
                useParams: true,
                useRedirect: false,
              },
            },
          },
          { name: "typescript-anchor" },
        ],
      });

      expect(files).toHaveLength(9);
      expect(files[0].destinationDir).toEqual("path/to/routes/login");
      expect(files[0].filename).toEqual("patternLogin");
      expect(files[0].extension).toEqual(".ts");
      expect(files[1].destinationDir).toEqual("path/to/routes/login");
      expect(files[1].filename).toEqual("generateUrlLogin");
      expect(files[1].extension).toEqual(".ts");
      expect(files[2].destinationDir).toEqual("path/to/routes/login");
      expect(files[2].filename).toEqual("LinkLogin");
      expect(files[2].extension).toEqual(".tsx");
      expect(files[3].destinationDir).toEqual("path/to/routes/login");
      expect(files[3].filename).toEqual("RedirectLogin");
      expect(files[3].extension).toEqual(".tsx");

      expect(files[4].destinationDir).toEqual("path/to/routes/user");
      expect(files[4].filename).toEqual("patternUser");
      expect(files[4].extension).toEqual(".ts");
      expect(files[5].destinationDir).toEqual("path/to/routes/user");
      expect(files[5].filename).toEqual("generateUrlUser");
      expect(files[5].extension).toEqual(".ts");
      expect(files[6].destinationDir).toEqual("path/to/routes/user");
      expect(files[6].filename).toEqual("LinkUser");
      expect(files[6].extension).toEqual(".tsx");
      expect(files[7].destinationDir).toEqual("path/to/routes/user");
      expect(files[7].filename).toEqual("useParamsUser");
      expect(files[7].extension).toEqual(".ts");
      expect(files[8].destinationDir).toEqual("path/to/routes/user");
      expect(files[8].filename).toEqual("RedirectUser");
      expect(files[8].extension).toEqual(".tsx");
    });
  });
});
