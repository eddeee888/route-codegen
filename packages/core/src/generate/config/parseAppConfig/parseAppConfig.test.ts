import { parseAppConfig } from "./parseAppConfig";
import { AppConfig, RoutingType } from "../types";
import { ParsedLinkOptionsReactRouterV5, ParsedLinkOptionsNextJS, ParsedLinkOptionsDefault } from "./types";

describe("parseAppConfig", () => {
  const defaultAppConfig: AppConfig = {
    routes: {
      login: "/login",
      user: "/user/:id",
    },
    destinationDir: "path/to/routes",
  };
  const defaultParsedLinkOptionsReactRouterV5: ParsedLinkOptionsReactRouterV5 = {
    importLink: {
      from: "react-router-dom",
      namedImports: [{ name: "LinkProps" }, { name: "Link" }],
    },
    linkComponent: "Link",
    linkProps: "LinkProps",
    hrefProp: "to",
    generateLinkComponent: false,
    generateRedirectComponent: false,
    generateUseRedirect: false,
    generateUseParams: false,
    mode: "loose",
  };
  const defaultParsedLinkOptionsNextJS: ParsedLinkOptionsNextJS = {
    importLink: {
      from: "next/link",
      defaultImport: "Link",
      namedImports: [{ name: "LinkProps" }],
    },
    linkComponent: "Link",
    linkProps: "LinkProps",
    hrefProp: "href",
    generateLinkComponent: false,
    generateUseParams: false,
    generateUseRedirect: false,
    mode: "loose",
  };
  const defaultParsedLinkOptionsDefault: ParsedLinkOptionsDefault = {
    hrefProp: "href",
    linkComponent: "a",
    inlineLinkProps: {
      template: `type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, 'href'>`,
      linkProps: "LinkProps",
    },
    generateLinkComponent: false,
    generateRedirectComponent: false,
    generateUseRedirect: false,
  };

  describe("general config", () => {
    it("should return parsed config for default config", () => {
      const parsedConfig = parseAppConfig("sampleApp", { ...defaultAppConfig });

      expect(parsedConfig).toEqual({
        routes: {
          login: {
            origin: "",
            path: "/login",
          },
          user: {
            origin: "",
            path: "/user/:id",
          },
        },
        destinationDir: "path/to/routes",
        routingType: RoutingType.Default,
        importGenerateUrl: { from: "@route-codegen/utils", namedImports: [{ name: "generateUrl" }] },
        importRedirectServerSide: { from: "@route-codegen/react", namedImports: [{ name: "RedirectServerSide" }] },
        routeLinkOptions: {
          ReactRouterV5: { ...defaultParsedLinkOptionsReactRouterV5 },
          NextJS: { ...defaultParsedLinkOptionsNextJS },
          Default: { ...defaultParsedLinkOptionsDefault },
        },
        generateRootIndex: false,
      });
    });

    it("should not throw error if no destinationDir", () => {
      expect(() => parseAppConfig("sampleApp", { ...defaultAppConfig, destinationDir: undefined })).not.toThrow();
    });

    it("should throw error if not valid routing type", () => {
      expect(() => parseAppConfig("sampleApp", { ...defaultAppConfig, routingType: "WRONG_ROUTING_TYPE" })).toThrowError(
        'sampleApp.routingType - Routing type of an app must be either "NextJS" or "ReactRouterV5" or "Default"'
      );
    });

    it("should parse top level generateLinkComponent", () => {
      const parsedConfig = parseAppConfig("sampleApp", { ...defaultAppConfig, generate: { linkComponent: false } });
      expect(parsedConfig.routeLinkOptions.Default.generateLinkComponent).toBe(false);
      expect(parsedConfig.routeLinkOptions.NextJS.generateLinkComponent).toBe(false);
      expect(parsedConfig.routeLinkOptions.ReactRouterV5.generateLinkComponent).toBe(false);

      const parsedConfig2 = parseAppConfig("sampleApp", { ...defaultAppConfig, generate: { linkComponent: true } });
      expect(parsedConfig2.routeLinkOptions.Default.generateLinkComponent).toBe(true);
      expect(parsedConfig2.routeLinkOptions.NextJS.generateLinkComponent).toBe(true);
      expect(parsedConfig2.routeLinkOptions.ReactRouterV5.generateLinkComponent).toBe(true);
    });

    it("should parse top level generateRedirectComponent", () => {
      const parsedConfig = parseAppConfig("sampleApp", { ...defaultAppConfig, generate: { redirectComponent: false } });
      expect(parsedConfig.routeLinkOptions.Default.generateRedirectComponent).toBe(false);
      expect(parsedConfig.routeLinkOptions.ReactRouterV5.generateRedirectComponent).toBe(false);

      const parsedConfig2 = parseAppConfig("sampleApp", { ...defaultAppConfig, generate: { redirectComponent: true } });
      expect(parsedConfig2.routeLinkOptions.Default.generateRedirectComponent).toBe(true);
      expect(parsedConfig2.routeLinkOptions.ReactRouterV5.generateRedirectComponent).toBe(true);
    });

    it("should parse generateRootIndex", () => {
      const parsedConfig = parseAppConfig("sampleApp", { ...defaultAppConfig, generate: { rootIndex: false } });
      expect(parsedConfig.generateRootIndex).toBe(false);

      const parsedConfig2 = parseAppConfig("sampleApp", { ...defaultAppConfig, generate: { rootIndex: true } });
      expect(parsedConfig2.generateRootIndex).toBe(true);
    });
  });

  describe("routeLinkOptions", () => {
    describe("ReactRouterV5", () => {
      it("should parse importCustomLink correctly", () => {
        const parsedConfig = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          reactRouterV5LinkOptions: {
            importCustomLink: {
              componentDefaultImport: true,
              propsNamedImport: "CustomLinkProps",
              hrefProp: "customHref",
              from: "path/to/CustomLink",
            },
          },
        });

        expect(parsedConfig.routeLinkOptions.ReactRouterV5).toEqual({
          importLink: {
            from: "path/to/CustomLink",
            defaultImport: "Link",
            namedImports: [{ name: "CustomLinkProps" }],
          },
          linkComponent: "Link",
          linkProps: "CustomLinkProps",
          hrefProp: "customHref",
          generateLinkComponent: false,
          generateRedirectComponent: false,
          generateUseRedirect: false,
          generateUseParams: false,
          mode: "loose",
        });
      });

      it("should parse mode correctly if passed explicitly", () => {
        const parsedConfig = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          reactRouterV5LinkOptions: { mode: "loose" },
        });

        expect(parsedConfig.routeLinkOptions.ReactRouterV5).toEqual({
          importLink: {
            from: "react-router-dom",
            namedImports: [{ name: "LinkProps" }, { name: "Link" }],
          },
          linkComponent: "Link",
          linkProps: "LinkProps",
          hrefProp: "to",
          generateLinkComponent: false,
          generateRedirectComponent: false,
          generateUseRedirect: false,
          generateUseParams: false,
          mode: "loose",
        });

        const parsedConfig2 = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          reactRouterV5LinkOptions: { mode: "strict" },
        });

        expect(parsedConfig2.routeLinkOptions.ReactRouterV5).toEqual({
          importLink: {
            from: "react-router-dom",
            namedImports: [{ name: "LinkProps" }, { name: "Link" }],
          },
          linkComponent: "Link",
          linkProps: "LinkProps",
          hrefProp: "to",
          generateLinkComponent: false,
          generateRedirectComponent: false,
          generateUseRedirect: false,
          generateUseParams: false,
          mode: "strict",
        });
      });

      it('should parse "componentNamedImport" correctly', () => {
        const parsedConfig = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          reactRouterV5LinkOptions: {
            importCustomLink: {
              componentNamedImport: "CustomLinkComponent",
              propsNamedImport: "CustomLinkProps",
              hrefProp: "customHref",
              from: "path/to/CustomLink",
            },
          },
        });

        expect(parsedConfig.routeLinkOptions.ReactRouterV5).toEqual({
          importLink: {
            from: "path/to/CustomLink",
            namedImports: [{ name: "CustomLinkProps" }, { name: "CustomLinkComponent", importAs: "Link" }],
          },
          linkComponent: "Link",
          linkProps: "CustomLinkProps",
          hrefProp: "customHref",
          generateLinkComponent: false,
          generateRedirectComponent: false,
          generateUseRedirect: false,
          generateUseParams: false,
          mode: "loose",
        });
      });

      it("should override generateUseRedirect correctly", () => {
        const parsedConfig = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generate: { useRedirect: false },
          reactRouterV5LinkOptions: {
            generate: { useRedirect: true },
          },
        });
        expect(parsedConfig.routeLinkOptions.ReactRouterV5.generateUseRedirect).toBe(true);

        const parsedConfig2 = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generate: { useRedirect: false },
          reactRouterV5LinkOptions: {
            generate: { useRedirect: false },
          },
        });
        expect(parsedConfig2.routeLinkOptions.ReactRouterV5.generateUseRedirect).toBe(false);
      });

      it("should override generateUseParams correctly", () => {
        const parsedConfig = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generate: { useParams: false },
          reactRouterV5LinkOptions: {
            generate: { useParams: true },
          },
        });
        expect(parsedConfig.routeLinkOptions.ReactRouterV5.generateUseParams).toBe(true);

        const parsedConfig2 = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generate: { useParams: true },
          reactRouterV5LinkOptions: {
            generate: { useParams: false },
          },
        });
        expect(parsedConfig2.routeLinkOptions.ReactRouterV5.generateUseParams).toBe(false);
      });

      it("should override generateLinkComponent correctly", () => {
        const parsedConfig = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generate: { linkComponent: false },
          reactRouterV5LinkOptions: {
            generate: { linkComponent: true },
          },
        });
        expect(parsedConfig.routeLinkOptions.ReactRouterV5.generateLinkComponent).toBe(true);

        const parsedConfig2 = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generate: { linkComponent: true },
          reactRouterV5LinkOptions: {
            generate: { linkComponent: false },
          },
        });
        expect(parsedConfig2.routeLinkOptions.ReactRouterV5.generateLinkComponent).toBe(false);
      });

      it("should override generateRedirectComponent correctly", () => {
        const parsedConfig = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generate: { redirectComponent: false },
          reactRouterV5LinkOptions: {
            generate: { redirectComponent: true },
          },
        });
        expect(parsedConfig.routeLinkOptions.ReactRouterV5.generateRedirectComponent).toBe(true);

        const parsedConfig2 = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generate: { redirectComponent: true },
          reactRouterV5LinkOptions: {
            generate: { redirectComponent: false },
          },
        });
        expect(parsedConfig2.routeLinkOptions.ReactRouterV5.generateRedirectComponent).toBe(false);
      });

      it('should throw error if no "componentDefaultImport" or "componentNamedImport" imports', () => {
        expect(() =>
          parseAppConfig("sampleApp", {
            ...defaultAppConfig,
            reactRouterV5LinkOptions: {
              importCustomLink: {
                propsNamedImport: "CustomLinkProps",
                hrefProp: "customHref",
                from: "path/to/CustomLink",
              },
            },
          })
        ).toThrowError(
          'sampleApp.reactRouterV5LinkOptions.importCustomLink - either "componentNamedImport" or "componentDefaultImport" is required'
        );
      });

      it('should throw error if no "propsNamedImport"', () => {
        expect(() =>
          parseAppConfig("sampleApp", {
            ...defaultAppConfig,
            reactRouterV5LinkOptions: {
              importCustomLink: {
                componentDefaultImport: true,
                hrefProp: "customHref",
                from: "path/to/CustomLink",
              },
            },
          })
        ).toThrowError('sampleApp.reactRouterV5LinkOptions.importCustomLink - "propsNamedImport" is required');
      });

      it('should throw error if no "hrefProp"', () => {
        expect(() =>
          parseAppConfig("sampleApp", {
            ...defaultAppConfig,
            reactRouterV5LinkOptions: {
              importCustomLink: {
                componentDefaultImport: true,
                propsNamedImport: "CustomLinkProps",
                from: "path/to/CustomLink",
              },
            },
          })
        ).toThrowError('sampleApp.reactRouterV5LinkOptions.importCustomLink - "hrefProp" is required');
      });

      it('should throw error if no "from"', () => {
        expect(() =>
          parseAppConfig("sampleApp", {
            ...defaultAppConfig,
            reactRouterV5LinkOptions: {
              importCustomLink: {
                componentDefaultImport: true,
                propsNamedImport: "CustomLinkProps",
                hrefProp: "customHref",
              },
            },
          })
        ).toThrowError('sampleApp.reactRouterV5LinkOptions.importCustomLink - "from" is required');
      });
    });

    describe("NextJS", () => {
      it("should parse importCustomLink correctly", () => {
        const parsedConfig = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          nextJSLinkOptions: {
            importCustomLink: {
              componentDefaultImport: true,
              propsNamedImport: "CustomLinkProps",
              hrefProp: "customHref",
              from: "path/to/CustomLink",
            },
          },
        });

        expect(parsedConfig.routeLinkOptions.NextJS).toEqual({
          importLink: {
            from: "path/to/CustomLink",
            defaultImport: "Link",
            namedImports: [{ name: "CustomLinkProps" }],
          },
          linkComponent: "Link",
          linkProps: "CustomLinkProps",
          hrefProp: "customHref",
          generateLinkComponent: false,
          generateUseParams: false,
          generateUseRedirect: false,
          mode: "loose",
        });
      });

      it('should parse "componentNamedImport" correctly', () => {
        const parsedConfig = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          nextJSLinkOptions: {
            importCustomLink: {
              componentNamedImport: "CustomLinkComponent",
              propsNamedImport: "CustomLinkProps",
              hrefProp: "customHref",
              from: "path/to/CustomLink",
            },
          },
        });

        expect(parsedConfig.routeLinkOptions.NextJS).toEqual({
          importLink: {
            from: "path/to/CustomLink",
            namedImports: [{ name: "CustomLinkProps" }, { name: "CustomLinkComponent", importAs: "Link" }],
          },
          linkComponent: "Link",
          linkProps: "CustomLinkProps",
          hrefProp: "customHref",
          generateLinkComponent: false,
          generateUseParams: false,
          generateUseRedirect: false,
          mode: "loose",
        });
      });

      it('should throw error if no "componentDefaultImport" or "componentNamedImport" imports', () => {
        expect(() =>
          parseAppConfig("sampleApp", {
            ...defaultAppConfig,
            nextJSLinkOptions: {
              importCustomLink: {
                propsNamedImport: "CustomLinkProps",
                hrefProp: "customHref",
                from: "path/to/CustomLink",
              },
            },
          })
        ).toThrowError(
          'sampleApp.nextJSLinkOptions.importCustomLink - either "componentNamedImport" or "componentDefaultImport" is required'
        );
      });

      it("should override generateUseParams correctly", () => {
        const parsedConfig = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generate: { useParams: false },
          nextJSLinkOptions: {
            generate: { useParams: true },
          },
        });
        expect(parsedConfig.routeLinkOptions.NextJS.generateUseParams).toBe(true);

        const parsedConfig2 = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generate: { useParams: true },
          nextJSLinkOptions: {
            generate: { useParams: false },
          },
        });
        expect(parsedConfig2.routeLinkOptions.NextJS.generateUseParams).toBe(false);
      });

      it("should override generateLinkComponent correctly", () => {
        const parsedConfig = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generate: { linkComponent: false },
          nextJSLinkOptions: {
            generate: { linkComponent: true },
          },
        });
        expect(parsedConfig.routeLinkOptions.NextJS.generateLinkComponent).toBe(true);

        const parsedConfig2 = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generate: { linkComponent: true },
          nextJSLinkOptions: {
            generate: { linkComponent: false },
          },
        });
        expect(parsedConfig2.routeLinkOptions.NextJS.generateLinkComponent).toBe(false);
      });

      it('should throw error if no "propsNamedImport"', () => {
        expect(() =>
          parseAppConfig("sampleApp", {
            ...defaultAppConfig,
            nextJSLinkOptions: {
              importCustomLink: {
                componentDefaultImport: true,
                hrefProp: "customHref",
                from: "path/to/CustomLink",
              },
            },
          })
        ).toThrowError('sampleApp.nextJSLinkOptions.importCustomLink - "propsNamedImport" is required');
      });

      it('should throw error if no "hrefProp"', () => {
        expect(() =>
          parseAppConfig("sampleApp", {
            ...defaultAppConfig,
            nextJSLinkOptions: {
              importCustomLink: {
                componentDefaultImport: true,
                propsNamedImport: "CustomLinkProps",
                from: "path/to/CustomLink",
              },
            },
          })
        ).toThrowError('sampleApp.nextJSLinkOptions.importCustomLink - "hrefProp" is required');
      });

      it('should throw error if no "from"', () => {
        expect(() =>
          parseAppConfig("sampleApp", {
            ...defaultAppConfig,
            nextJSLinkOptions: {
              importCustomLink: {
                componentDefaultImport: true,
                propsNamedImport: "CustomLinkProps",
                hrefProp: "customHref",
              },
            },
          })
        ).toThrowError('sampleApp.nextJSLinkOptions.importCustomLink - "from" is required');
      });

      it("should parse mode correctly if passed explicitly", () => {
        const parsedConfig = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          nextJSLinkOptions: { mode: "loose" },
        });

        expect(parsedConfig.routeLinkOptions.NextJS).toEqual({
          importLink: {
            from: "next/link",
            defaultImport: "Link",
            namedImports: [{ name: "LinkProps" }],
          },
          linkComponent: "Link",
          linkProps: "LinkProps",
          hrefProp: "href",
          generateLinkComponent: false,
          generateUseRedirect: false,
          generateUseParams: false,
          mode: "loose",
        });

        const parsedConfig2 = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          nextJSLinkOptions: { mode: "strict" },
        });

        expect(parsedConfig2.routeLinkOptions.NextJS).toEqual({
          importLink: {
            from: "next/link",
            defaultImport: "Link",
            namedImports: [{ name: "LinkProps" }],
          },
          linkComponent: "Link",
          linkProps: "LinkProps",
          hrefProp: "href",
          generateLinkComponent: false,
          generateUseRedirect: false,
          generateUseParams: false,
          mode: "strict",
        });
      });
    });

    describe("Default", () => {
      it("should parse importCustomLink correctly", () => {
        const parsedConfig = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          defaultLinkOptions: {
            importCustomLink: {
              componentDefaultImport: true,
              propsNamedImport: "CustomLinkProps",
              hrefProp: "customHref",
              from: "path/to/CustomLink",
            },
          },
        });

        expect(parsedConfig.routeLinkOptions.Default).toEqual({
          importLink: {
            from: "path/to/CustomLink",
            defaultImport: "Link",
            namedImports: [{ name: "CustomLinkProps" }],
          },
          linkComponent: "Link",
          linkProps: "CustomLinkProps",
          hrefProp: "customHref",
          generateLinkComponent: false,
          generateRedirectComponent: false,
          generateUseRedirect: false,
        });
      });

      it('should parse "componentNamedImport" correctly', () => {
        const parsedConfig = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          defaultLinkOptions: {
            importCustomLink: {
              componentNamedImport: "CustomLinkComponent",
              propsNamedImport: "CustomLinkProps",
              hrefProp: "customHref",
              from: "path/to/CustomLink",
            },
          },
        });

        expect(parsedConfig.routeLinkOptions.Default).toEqual({
          importLink: {
            from: "path/to/CustomLink",
            namedImports: [{ name: "CustomLinkProps" }, { name: "CustomLinkComponent", importAs: "Link" }],
          },
          linkComponent: "Link",
          linkProps: "CustomLinkProps",
          hrefProp: "customHref",
          generateLinkComponent: false,
          generateRedirectComponent: false,
          generateUseRedirect: false,
        });
      });

      it("should override generateUseRedirect correctly", () => {
        const parsedConfig = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generate: { useRedirect: false },
          defaultLinkOptions: {
            ...defaultAppConfig.defaultLinkOptions,
            generate: { useRedirect: true },
          },
        });
        expect(parsedConfig.routeLinkOptions.Default.generateUseRedirect).toBe(true);

        const parsedConfig2 = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generate: { useRedirect: true },
          defaultLinkOptions: {
            ...defaultAppConfig.defaultLinkOptions,
            generate: { useRedirect: false },
          },
        });
        expect(parsedConfig2.routeLinkOptions.Default.generateUseRedirect).toBe(false);
      });

      it("should override generateLinkComponent correctly", () => {
        const parsedConfig = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generate: { linkComponent: false },
          defaultLinkOptions: {
            generate: { linkComponent: true },
          },
        });
        expect(parsedConfig.routeLinkOptions.Default.generateLinkComponent).toBe(true);

        const parsedConfig2 = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generate: { linkComponent: true },
          defaultLinkOptions: {
            generate: { linkComponent: false },
          },
        });
        expect(parsedConfig2.routeLinkOptions.Default.generateLinkComponent).toBe(false);
      });

      it('should throw error if no "componentDefaultImport" or "componentNamedImport" imports', () => {
        expect(() =>
          parseAppConfig("sampleApp", {
            ...defaultAppConfig,
            defaultLinkOptions: {
              importCustomLink: {
                propsNamedImport: "CustomLinkProps",
                hrefProp: "customHref",
                from: "path/to/CustomLink",
              },
            },
          })
        ).toThrowError(
          'sampleApp.defaultLinkOptions.importCustomLink - either "componentNamedImport" or "componentDefaultImport" is required'
        );
      });

      it('should throw error if no "propsNamedImport"', () => {
        expect(() =>
          parseAppConfig("sampleApp", {
            ...defaultAppConfig,
            defaultLinkOptions: {
              importCustomLink: {
                componentDefaultImport: true,
                hrefProp: "customHref",
                from: "path/to/CustomLink",
              },
            },
          })
        ).toThrowError('sampleApp.defaultLinkOptions.importCustomLink - "propsNamedImport" is required');
      });

      it('should throw error if no "hrefProp"', () => {
        expect(() =>
          parseAppConfig("sampleApp", {
            ...defaultAppConfig,
            defaultLinkOptions: {
              importCustomLink: {
                componentDefaultImport: true,
                propsNamedImport: "CustomLinkProps",
                from: "path/to/CustomLink",
              },
            },
          })
        ).toThrowError('sampleApp.defaultLinkOptions.importCustomLink - "hrefProp" is required');
      });

      it('should throw error if no "from"', () => {
        expect(() =>
          parseAppConfig("sampleApp", {
            ...defaultAppConfig,
            defaultLinkOptions: {
              importCustomLink: {
                componentDefaultImport: true,
                propsNamedImport: "CustomLinkProps",
                hrefProp: "customHref",
              },
            },
          })
        ).toThrowError('sampleApp.defaultLinkOptions.importCustomLink - "from" is required');
      });
    });
  });
});
