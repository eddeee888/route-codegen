import generateTemplateFiles, { GenerateTemplateFilesParams } from "./generateTemplateFiles";
import { RoutingType } from "../config";

// Only test `destinationDir`, `filename` and `extension here` i.e. values needed to generate files.
// Templates should be unit tested in `generate**File.test.ts`
describe("generateTemplateFiles", () => {
  const params: GenerateTemplateFilesParams = {
    origin: "",
    routeName: "login",
    routePattern: "/login",
    routingType: RoutingType.Default,
    importGenerateUrl: {
      from: "route-codegen",
      namedImports: [{ name: "generateUrl" }],
    },
    importRedirectServerSide: {
      from: "route-codegen/RedirectServerSide",
      defaultImport: "RedirectServerSide",
    },
    destinationDir: "path/to/routes",
    routeLinkOptions: {
      ReactRouterV5: {
        importLink: {
          from: "src/common/Link",
          defaultImport: "Link",
          namedImports: [{ name: "CustomLinkProps" }],
        },
        hrefProp: "to",
        linkComponent: "Link",
        linkProps: "CustomLinkProps",
        generateLinkComponent: true,
        generateUseRedirect: true,
        generateUseParams: true,
        generateRedirectComponent: true,
        mode: "strict",
      },
      Default: {
        hrefProp: "href",
        linkComponent: "a",
        inlineLinkProps: {
          template: "type LinkProps = Omit<DefaultLinkProps, 'href'>;",
          linkProps: "LinkProps",
        },
        generateLinkComponent: true,
        generateRedirectComponent: true,
        generateUseRedirect: true,
      },
      NextJS: {
        importLink: {
          from: "src/NextJS/Link",
          defaultImport: "Link",
          namedImports: [{ name: "NextJSLinkProps" }],
        },
        linkComponent: "Link",
        hrefProp: "customHref",
        linkProps: "NextJSLinkProps",
        generateLinkComponent: true,
        generateUseParams: true,
        generateUseRedirect: true,
        mode: "loose",
      },
    },
  };

  describe("Default", () => {
    it("should generate files", () => {
      const files = generateTemplateFiles({ ...params, routingType: RoutingType.Default });
      expect(files).toHaveLength(5);
      expect(files[0].filename).toEqual("patternLogin");
      expect(files[0].extension).toEqual(".ts");
      expect(files[0].destinationDir).toEqual("path/to/routes/login");
      expect(files[1].filename).toEqual("generateUrlLogin");
      expect(files[1].extension).toEqual(".ts");
      expect(files[1].destinationDir).toEqual("path/to/routes/login");
      expect(files[2].filename).toEqual("LinkLogin");
      expect(files[2].extension).toEqual(".tsx");
      expect(files[2].destinationDir).toEqual("path/to/routes/login");
      expect(files[3].filename).toEqual("useRedirectLogin");
      expect(files[3].extension).toEqual(".ts");
      expect(files[3].destinationDir).toEqual("path/to/routes/login");
      expect(files[4].filename).toEqual("RedirectLogin");
      expect(files[4].extension).toEqual(".tsx");
      expect(files[4].destinationDir).toEqual("path/to/routes/login");
    });

    it("should not generate Link if not needed", () => {
      const files = generateTemplateFiles({
        ...params,
        routingType: RoutingType.Default,
        routeLinkOptions: {
          ...params.routeLinkOptions,
          Default: { ...params.routeLinkOptions.Default, generateLinkComponent: false },
        },
      });
      expect(files).toHaveLength(4);
      expect(files[0].filename).toEqual("patternLogin");
      expect(files[0].extension).toEqual(".ts");
      expect(files[0].destinationDir).toEqual("path/to/routes/login");
      expect(files[1].filename).toEqual("generateUrlLogin");
      expect(files[1].extension).toEqual(".ts");
      expect(files[1].destinationDir).toEqual("path/to/routes/login");
      expect(files[2].filename).toEqual("useRedirectLogin");
      expect(files[2].extension).toEqual(".ts");
      expect(files[2].destinationDir).toEqual("path/to/routes/login");
      expect(files[3].filename).toEqual("RedirectLogin");
      expect(files[3].extension).toEqual(".tsx");
      expect(files[3].destinationDir).toEqual("path/to/routes/login");
    });

    it("should not generate Redirect component if not needed", () => {
      const files = generateTemplateFiles({
        ...params,
        routingType: RoutingType.Default,
        routeLinkOptions: {
          ...params.routeLinkOptions,
          Default: { ...params.routeLinkOptions.Default, generateRedirectComponent: false },
        },
      });
      expect(files).toHaveLength(4);
      expect(files[0].filename).toEqual("patternLogin");
      expect(files[0].extension).toEqual(".ts");
      expect(files[0].destinationDir).toEqual("path/to/routes/login");
      expect(files[1].filename).toEqual("generateUrlLogin");
      expect(files[1].extension).toEqual(".ts");
      expect(files[1].destinationDir).toEqual("path/to/routes/login");
      expect(files[2].filename).toEqual("LinkLogin");
      expect(files[2].extension).toEqual(".tsx");
      expect(files[2].destinationDir).toEqual("path/to/routes/login");
      expect(files[3].filename).toEqual("useRedirectLogin");
      expect(files[3].extension).toEqual(".ts");
      expect(files[3].destinationDir).toEqual("path/to/routes/login");
    });
  });

  describe("ReactRouterV5", () => {
    it("should generate files when no dynamic path params", () => {
      const files = generateTemplateFiles({ ...params, routingType: RoutingType.ReactRouterV5 });
      expect(files).toHaveLength(5);
      expect(files[0].filename).toEqual("patternLogin");
      expect(files[0].extension).toEqual(".ts");
      expect(files[0].destinationDir).toEqual("path/to/routes/login");
      expect(files[1].filename).toEqual("generateUrlLogin");
      expect(files[1].extension).toEqual(".ts");
      expect(files[1].destinationDir).toEqual("path/to/routes/login");
      expect(files[2].filename).toEqual("LinkLogin");
      expect(files[2].extension).toEqual(".tsx");
      expect(files[2].destinationDir).toEqual("path/to/routes/login");
      expect(files[3].filename).toEqual("useRedirectLogin");
      expect(files[3].extension).toEqual(".ts");
      expect(files[3].destinationDir).toEqual("path/to/routes/login");
      expect(files[4].filename).toEqual("RedirectLogin");
      expect(files[4].extension).toEqual(".tsx");
      expect(files[4].destinationDir).toEqual("path/to/routes/login");
    });

    it("should generate files with dynamic path params", () => {
      const files = generateTemplateFiles({
        ...params,
        routePattern: "/login/:id",
        routingType: RoutingType.ReactRouterV5,
      });
      expect(files).toHaveLength(6);
      expect(files[0].filename).toEqual("patternLogin");
      expect(files[0].extension).toEqual(".ts");
      expect(files[0].destinationDir).toEqual("path/to/routes/login");
      expect(files[1].filename).toEqual("generateUrlLogin");
      expect(files[1].extension).toEqual(".ts");
      expect(files[1].destinationDir).toEqual("path/to/routes/login");
      expect(files[2].filename).toEqual("LinkLogin");
      expect(files[2].extension).toEqual(".tsx");
      expect(files[2].destinationDir).toEqual("path/to/routes/login");
      expect(files[3].filename).toEqual("useParamsLogin");
      expect(files[3].extension).toEqual(".ts");
      expect(files[3].destinationDir).toEqual("path/to/routes/login");
      expect(files[4].filename).toEqual("useRedirectLogin");
      expect(files[4].extension).toEqual(".ts");
      expect(files[4].destinationDir).toEqual("path/to/routes/login");
      expect(files[5].filename).toEqual("RedirectLogin");
      expect(files[5].extension).toEqual(".tsx");
      expect(files[5].destinationDir).toEqual("path/to/routes/login");
    });

    it("should not generate Link if not needed", () => {
      const files = generateTemplateFiles({
        ...params,
        routePattern: "/login/:id",
        routingType: RoutingType.ReactRouterV5,
        routeLinkOptions: {
          ...params.routeLinkOptions,
          ReactRouterV5: { ...params.routeLinkOptions.ReactRouterV5, generateLinkComponent: false },
        },
      });
      expect(files).toHaveLength(5);
      expect(files[0].filename).toEqual("patternLogin");
      expect(files[0].extension).toEqual(".ts");
      expect(files[0].destinationDir).toEqual("path/to/routes/login");
      expect(files[1].filename).toEqual("generateUrlLogin");
      expect(files[1].extension).toEqual(".ts");
      expect(files[1].destinationDir).toEqual("path/to/routes/login");
      expect(files[2].filename).toEqual("useParamsLogin");
      expect(files[2].extension).toEqual(".ts");
      expect(files[2].destinationDir).toEqual("path/to/routes/login");
      expect(files[3].filename).toEqual("useRedirectLogin");
      expect(files[3].extension).toEqual(".ts");
      expect(files[3].destinationDir).toEqual("path/to/routes/login");
      expect(files[4].filename).toEqual("RedirectLogin");
      expect(files[4].extension).toEqual(".tsx");
      expect(files[4].destinationDir).toEqual("path/to/routes/login");
    });

    it("should not generate Redirect if not needed", () => {
      const files = generateTemplateFiles({
        ...params,
        routePattern: "/login/:id",
        routingType: RoutingType.ReactRouterV5,
        routeLinkOptions: {
          ...params.routeLinkOptions,
          ReactRouterV5: { ...params.routeLinkOptions.ReactRouterV5, generateRedirectComponent: false },
        },
      });
      expect(files).toHaveLength(5);
      expect(files[0].filename).toEqual("patternLogin");
      expect(files[0].extension).toEqual(".ts");
      expect(files[0].destinationDir).toEqual("path/to/routes/login");
      expect(files[1].filename).toEqual("generateUrlLogin");
      expect(files[1].extension).toEqual(".ts");
      expect(files[1].destinationDir).toEqual("path/to/routes/login");
      expect(files[2].filename).toEqual("LinkLogin");
      expect(files[2].extension).toEqual(".tsx");
      expect(files[2].destinationDir).toEqual("path/to/routes/login");
      expect(files[3].filename).toEqual("useParamsLogin");
      expect(files[3].extension).toEqual(".ts");
      expect(files[3].destinationDir).toEqual("path/to/routes/login");
      expect(files[4].filename).toEqual("useRedirectLogin");
      expect(files[4].extension).toEqual(".ts");
      expect(files[4].destinationDir).toEqual("path/to/routes/login");
    });

    it("should not generate useParams if not needed", () => {
      const files = generateTemplateFiles({
        ...params,
        routePattern: "/login/:id",
        routingType: RoutingType.ReactRouterV5,
        routeLinkOptions: {
          ...params.routeLinkOptions,
          ReactRouterV5: { ...params.routeLinkOptions.ReactRouterV5, generateUseParams: false },
        },
      });
      expect(files).toHaveLength(5);
      expect(files[0].filename).toEqual("patternLogin");
      expect(files[0].extension).toEqual(".ts");
      expect(files[0].destinationDir).toEqual("path/to/routes/login");
      expect(files[1].filename).toEqual("generateUrlLogin");
      expect(files[1].extension).toEqual(".ts");
      expect(files[1].destinationDir).toEqual("path/to/routes/login");
      expect(files[2].filename).toEqual("LinkLogin");
      expect(files[2].extension).toEqual(".tsx");
      expect(files[2].destinationDir).toEqual("path/to/routes/login");
      expect(files[3].filename).toEqual("useRedirectLogin");
      expect(files[3].extension).toEqual(".ts");
      expect(files[3].destinationDir).toEqual("path/to/routes/login");
      expect(files[4].filename).toEqual("RedirectLogin");
      expect(files[4].extension).toEqual(".tsx");
      expect(files[4].destinationDir).toEqual("path/to/routes/login");
    });

    it("should not generate useRedirect if not needed", () => {
      const files = generateTemplateFiles({
        ...params,
        routePattern: "/login/:id",
        routingType: RoutingType.ReactRouterV5,
        routeLinkOptions: {
          ...params.routeLinkOptions,
          ReactRouterV5: { ...params.routeLinkOptions.ReactRouterV5, generateUseRedirect: false },
        },
      });
      expect(files).toHaveLength(5);
      expect(files[0].filename).toEqual("patternLogin");
      expect(files[0].extension).toEqual(".ts");
      expect(files[0].destinationDir).toEqual("path/to/routes/login");
      expect(files[1].filename).toEqual("generateUrlLogin");
      expect(files[1].extension).toEqual(".ts");
      expect(files[1].destinationDir).toEqual("path/to/routes/login");
      expect(files[2].filename).toEqual("LinkLogin");
      expect(files[2].extension).toEqual(".tsx");
      expect(files[2].destinationDir).toEqual("path/to/routes/login");
      expect(files[3].filename).toEqual("useParamsLogin");
      expect(files[3].extension).toEqual(".ts");
      expect(files[3].destinationDir).toEqual("path/to/routes/login");
      expect(files[4].filename).toEqual("RedirectLogin");
      expect(files[4].extension).toEqual(".tsx");
      expect(files[4].destinationDir).toEqual("path/to/routes/login");
    });
  });

  describe("NextJS", () => {
    it("should generate files", () => {
      const files = generateTemplateFiles({ ...params, routingType: RoutingType.NextJS });
      expect(files).toHaveLength(4);
      expect(files[0].filename).toEqual("patternLogin");
      expect(files[0].extension).toEqual(".ts");
      expect(files[0].destinationDir).toEqual("path/to/routes/login");
      expect(files[1].filename).toEqual("generateUrlLogin");
      expect(files[1].extension).toEqual(".ts");
      expect(files[1].destinationDir).toEqual("path/to/routes/login");
      expect(files[2].filename).toEqual("LinkLogin");
      expect(files[2].extension).toEqual(".tsx");
      expect(files[2].destinationDir).toEqual("path/to/routes/login");
      expect(files[3].filename).toEqual("useRedirectLogin");
      expect(files[3].extension).toEqual(".ts");
      expect(files[3].destinationDir).toEqual("path/to/routes/login");
    });

    it("should generate files with dynamic path params", () => {
      const files = generateTemplateFiles({
        ...params,
        routePattern: "/login/:id",
        routingType: RoutingType.NextJS,
      });
      expect(files).toHaveLength(5);
      expect(files[0].filename).toEqual("patternLogin");
      expect(files[0].extension).toEqual(".ts");
      expect(files[0].destinationDir).toEqual("path/to/routes/login");
      expect(files[1].filename).toEqual("generateUrlLogin");
      expect(files[1].extension).toEqual(".ts");
      expect(files[1].destinationDir).toEqual("path/to/routes/login");
      expect(files[2].filename).toEqual("LinkLogin");
      expect(files[2].extension).toEqual(".tsx");
      expect(files[2].destinationDir).toEqual("path/to/routes/login");
      expect(files[3].filename).toEqual("useParamsLogin");
      expect(files[3].extension).toEqual(".ts");
      expect(files[3].destinationDir).toEqual("path/to/routes/login");
      expect(files[4].filename).toEqual("useRedirectLogin");
      expect(files[4].extension).toEqual(".ts");
      expect(files[4].destinationDir).toEqual("path/to/routes/login");
    });

    it("should not generate Link if not needed", () => {
      const files = generateTemplateFiles({
        ...params,
        routingType: RoutingType.NextJS,
        routeLinkOptions: {
          ...params.routeLinkOptions,
          NextJS: { ...params.routeLinkOptions.NextJS, generateLinkComponent: false },
        },
      });
      expect(files).toHaveLength(3);
      expect(files[0].filename).toEqual("patternLogin");
      expect(files[0].extension).toEqual(".ts");
      expect(files[0].destinationDir).toEqual("path/to/routes/login");
      expect(files[1].filename).toEqual("generateUrlLogin");
      expect(files[1].extension).toEqual(".ts");
      expect(files[1].destinationDir).toEqual("path/to/routes/login");
      expect(files[2].filename).toEqual("useRedirectLogin");
      expect(files[2].extension).toEqual(".ts");
      expect(files[2].destinationDir).toEqual("path/to/routes/login");
    });

    it("should not generate useRedirect if not needed", () => {
      const files = generateTemplateFiles({
        ...params,
        routingType: RoutingType.NextJS,
        routeLinkOptions: {
          ...params.routeLinkOptions,
          NextJS: { ...params.routeLinkOptions.NextJS, generateUseRedirect: false },
        },
      });
      expect(files).toHaveLength(3);
      expect(files[0].filename).toEqual("patternLogin");
      expect(files[0].extension).toEqual(".ts");
      expect(files[0].destinationDir).toEqual("path/to/routes/login");
      expect(files[1].filename).toEqual("generateUrlLogin");
      expect(files[1].extension).toEqual(".ts");
      expect(files[1].destinationDir).toEqual("path/to/routes/login");
      expect(files[2].filename).toEqual("LinkLogin");
      expect(files[2].extension).toEqual(".tsx");
      expect(files[2].destinationDir).toEqual("path/to/routes/login");
    });
  });
});
