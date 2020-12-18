import { parseAppConfig, ParsedLinkOptionsReactRouterV5, ParsedLinkOptionsNextJS, ParsedLinkOptionsDefault } from "./parseAppConfig";
import { AppConfig, RoutingType } from "./types";

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
    generateLinkComponent: true,
    generateRedirectComponent: true,
    generateUseRedirect: true,
    generateUseParams: true,
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
    generateLinkComponent: true,
    generateUseParams: true,
    generateUseRedirect: true,
  };
  const defaultParsedLinkOptionsDefault: ParsedLinkOptionsDefault = {
    hrefProp: "href",
    linkComponent: "a",
    inlineLinkProps: {
      template: `type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, 'href'>`,
      linkProps: "LinkProps",
    },
    generateLinkComponent: true,
    generateRedirectComponent: true,
    generateUseRedirect: true,
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
      const parsedConfig = parseAppConfig("sampleApp", { ...defaultAppConfig, generateLinkComponent: false });
      expect(parsedConfig.routeLinkOptions.Default.generateLinkComponent).toBe(false);
      expect(parsedConfig.routeLinkOptions.NextJS.generateLinkComponent).toBe(false);
      expect(parsedConfig.routeLinkOptions.ReactRouterV5.generateLinkComponent).toBe(false);

      const parsedConfig2 = parseAppConfig("sampleApp", { ...defaultAppConfig, generateLinkComponent: true });
      expect(parsedConfig2.routeLinkOptions.Default.generateLinkComponent).toBe(true);
      expect(parsedConfig2.routeLinkOptions.NextJS.generateLinkComponent).toBe(true);
      expect(parsedConfig2.routeLinkOptions.ReactRouterV5.generateLinkComponent).toBe(true);
    });

    it("should parse top level generateRedirectComponent", () => {
      const parsedConfig = parseAppConfig("sampleApp", { ...defaultAppConfig, generateRedirectComponent: false });
      expect(parsedConfig.routeLinkOptions.Default.generateRedirectComponent).toBe(false);
      expect(parsedConfig.routeLinkOptions.ReactRouterV5.generateRedirectComponent).toBe(false);

      const parsedConfig2 = parseAppConfig("sampleApp", { ...defaultAppConfig, generateRedirectComponent: true });
      expect(parsedConfig2.routeLinkOptions.Default.generateRedirectComponent).toBe(true);
      expect(parsedConfig2.routeLinkOptions.ReactRouterV5.generateRedirectComponent).toBe(true);
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
          generateLinkComponent: true,
          generateRedirectComponent: true,
          generateUseRedirect: true,
          generateUseParams: true,
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
          generateLinkComponent: true,
          generateRedirectComponent: true,
          generateUseRedirect: true,
          generateUseParams: true,
        });
      });

      it("should override generateUseRedirect correctly", () => {
        const parsedConfig = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generateUseRedirect: false,
          reactRouterV5LinkOptions: {
            generateUseRedirect: true,
          },
        });
        expect(parsedConfig.routeLinkOptions.ReactRouterV5.generateUseRedirect).toBe(true);

        const parsedConfig2 = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generateUseRedirect: false,
          reactRouterV5LinkOptions: {
            generateUseRedirect: false,
          },
        });
        expect(parsedConfig2.routeLinkOptions.ReactRouterV5.generateUseRedirect).toBe(false);
      });

      it("should override generateUseParams correctly", () => {
        const parsedConfig = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generateUseParams: false,
          reactRouterV5LinkOptions: {
            generateUseParams: true,
          },
        });
        expect(parsedConfig.routeLinkOptions.ReactRouterV5.generateUseParams).toBe(true);

        const parsedConfig2 = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generateUseParams: true,
          reactRouterV5LinkOptions: {
            generateUseParams: false,
          },
        });
        expect(parsedConfig2.routeLinkOptions.ReactRouterV5.generateUseParams).toBe(false);
      });

      it("should override generateLinkComponent correctly", () => {
        const parsedConfig = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generateLinkComponent: false,
          reactRouterV5LinkOptions: {
            generateLinkComponent: true,
          },
        });
        expect(parsedConfig.routeLinkOptions.ReactRouterV5.generateLinkComponent).toBe(true);

        const parsedConfig2 = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generateLinkComponent: true,
          reactRouterV5LinkOptions: {
            generateLinkComponent: false,
          },
        });
        expect(parsedConfig2.routeLinkOptions.ReactRouterV5.generateLinkComponent).toBe(false);
      });

      it("should override generateRedirectComponent correctly", () => {
        const parsedConfig = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generateRedirectComponent: false,
          reactRouterV5LinkOptions: {
            generateRedirectComponent: true,
          },
        });
        expect(parsedConfig.routeLinkOptions.ReactRouterV5.generateRedirectComponent).toBe(true);

        const parsedConfig2 = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generateRedirectComponent: true,
          reactRouterV5LinkOptions: {
            generateRedirectComponent: false,
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
          generateLinkComponent: true,
          generateUseParams: true,
          generateUseRedirect: true,
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
          generateLinkComponent: true,
          generateUseParams: true,
          generateUseRedirect: true,
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
          generateUseParams: false,
          nextJSLinkOptions: {
            generateUseParams: true,
          },
        });
        expect(parsedConfig.routeLinkOptions.NextJS.generateUseParams).toBe(true);

        const parsedConfig2 = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generateUseParams: true,
          nextJSLinkOptions: {
            generateUseParams: false,
          },
        });
        expect(parsedConfig2.routeLinkOptions.NextJS.generateUseParams).toBe(false);
      });

      it("should override generateLinkComponent correctly", () => {
        const parsedConfig = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generateLinkComponent: false,
          nextJSLinkOptions: {
            generateLinkComponent: true,
          },
        });
        expect(parsedConfig.routeLinkOptions.NextJS.generateLinkComponent).toBe(true);

        const parsedConfig2 = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generateLinkComponent: true,
          nextJSLinkOptions: {
            generateLinkComponent: false,
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
          generateLinkComponent: true,
          generateRedirectComponent: true,
          generateUseRedirect: true,
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
          generateLinkComponent: true,
          generateRedirectComponent: true,
          generateUseRedirect: true,
        });
      });

      it("should override generateUseRedirect correctly", () => {
        const parsedConfig = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generateUseRedirect: false,
          defaultLinkOptions: {
            ...defaultAppConfig.defaultLinkOptions,
            generateUseRedirect: true,
          },
        });
        expect(parsedConfig.routeLinkOptions.Default.generateUseRedirect).toBe(true);

        const parsedConfig2 = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generateUseRedirect: true,
          defaultLinkOptions: {
            ...defaultAppConfig.defaultLinkOptions,
            generateUseRedirect: false,
          },
        });
        expect(parsedConfig2.routeLinkOptions.Default.generateUseRedirect).toBe(false);
      });

      it("should override generateLinkComponent correctly", () => {
        const parsedConfig = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generateLinkComponent: false,
          defaultLinkOptions: {
            generateLinkComponent: true,
          },
        });
        expect(parsedConfig.routeLinkOptions.Default.generateLinkComponent).toBe(true);

        const parsedConfig2 = parseAppConfig("sampleApp", {
          ...defaultAppConfig,
          generateLinkComponent: true,
          defaultLinkOptions: {
            generateLinkComponent: false,
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
