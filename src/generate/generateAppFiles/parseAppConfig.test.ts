import parseAppConfig, {
  ParsedReactRouterV5LinkOptions,
  ParsedNextJSLinkOptions,
  ParsedDefaultLinkOptions,
} from './parseAppConfig';
import { AppConfig, RoutingType } from '../config';

describe('parseAppConfig', () => {
  const defaultAppConfig: AppConfig = {
    routes: {
      login: '/login',
      user: '/user/:id',
    },
    destinationDir: 'path/to/routes',
  };
  const defaultParsedReactRouterV5RouteLinkOptions: ParsedReactRouterV5LinkOptions = {
    importLink: {
      from: 'react-router-dom',
      namedImports: [{ name: 'LinkProps' }, { name: 'Link' }],
    },
    linkComponent: 'Link',
    linkProps: 'LinkProps',
    hrefProp: 'to',
    useRedirect: true,
    useParams: true,
  };
  const defaultParsedNextJSRouteLinkOptions: ParsedNextJSLinkOptions = {
    importLink: {
      from: 'next/link',
      defaultImport: 'Link',
      namedImports: [{ name: 'LinkProps' }],
    },
    linkComponent: 'Link',
    linkProps: 'LinkProps',
    hrefProp: 'href',
  };
  const defaultNormalRouteLinkOptions: ParsedDefaultLinkOptions = {
    hrefProp: 'href',
    linkComponent: 'a',
    inlineLinkProps: {
      template: `type LinkProps = Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, 'href'>`,
      linkProps: 'LinkProps',
    },
  };

  describe('general config', () => {
    it('should return parsed config for default config', () => {
      const parsedConfig = parseAppConfig('sampleApp', { ...defaultAppConfig });

      expect(parsedConfig).toEqual({
        routes: {
          login: '/login',
          user: '/user/:id',
        },
        destinationDir: 'path/to/routes',
        routingType: RoutingType.Default,
        importGenerateUrl: { from: 'route-codegen', namedImports: [{ name: 'generateUrl' }] },
        shouldGenerateLink: true,
        routeLinkOptions: {
          ReactRouterV5: { ...defaultParsedReactRouterV5RouteLinkOptions },
          NextJS: { ...defaultParsedNextJSRouteLinkOptions },
          Default: { ...defaultNormalRouteLinkOptions },
        },
      });
    });

    it('should not throw error if no destinationDir', () => {
      expect(() => parseAppConfig('sampleApp', { ...defaultAppConfig, destinationDir: undefined })).not.toThrow();
    });

    it('should throw error if not valid routing type', () => {
      expect(() =>
        parseAppConfig('sampleApp', { ...defaultAppConfig, routingType: 'WRONG_ROUTING_TYPE' })
      ).toThrowError(
        'sampleApp.routingType - Routing type of an app must be either "NextJS" or "ReactRouterV5" or "Default"'
      );
    });

    it('should parse generateLink', () => {
      const parsedConfig = parseAppConfig('sampleApp', { ...defaultAppConfig, generateLink: false });
      expect(parsedConfig.shouldGenerateLink).toBe(false);

      const parsedConfig2 = parseAppConfig('sampleApp', { ...defaultAppConfig, generateLink: true });
      expect(parsedConfig2.shouldGenerateLink).toBe(true);
    });
  });

  describe('routeLinkOptions', () => {
    describe('ReactRouterV5', () => {
      it('should parse importCustomLink correctly', () => {
        const parsedConfig = parseAppConfig('sampleApp', {
          ...defaultAppConfig,
          reactRouterV5LinkOptions: {
            importCustomLink: {
              componentDefaultImport: true,
              propsNamedImport: 'CustomLinkProps',
              hrefProp: 'customHref',
              from: 'path/to/CustomLink',
            },
          },
        });

        expect(parsedConfig.routeLinkOptions.ReactRouterV5).toEqual({
          importLink: {
            from: 'path/to/CustomLink',
            defaultImport: 'Link',
            namedImports: [{ name: 'CustomLinkProps' }],
          },
          linkComponent: 'Link',
          linkProps: 'CustomLinkProps',
          hrefProp: 'customHref',
          useRedirect: true,
          useParams: true,
        });
      });

      it('should parse "componentNamedImport" correctly', () => {
        const parsedConfig = parseAppConfig('sampleApp', {
          ...defaultAppConfig,
          reactRouterV5LinkOptions: {
            importCustomLink: {
              componentNamedImport: 'CustomLinkComponent',
              propsNamedImport: 'CustomLinkProps',
              hrefProp: 'customHref',
              from: 'path/to/CustomLink',
            },
          },
        });

        expect(parsedConfig.routeLinkOptions.ReactRouterV5).toEqual({
          importLink: {
            from: 'path/to/CustomLink',
            namedImports: [{ name: 'CustomLinkProps' }, { name: 'CustomLinkComponent', importAs: 'Link' }],
          },
          linkComponent: 'Link',
          linkProps: 'CustomLinkProps',
          hrefProp: 'customHref',
          useRedirect: true,
          useParams: true,
        });
      });

      it('should parse useRedirect correctly', () => {
        const parsedConfig = parseAppConfig('sampleApp', {
          ...defaultAppConfig,
          reactRouterV5LinkOptions: {
            useRedirect: true,
          },
        });
        expect(parsedConfig.routeLinkOptions.ReactRouterV5.useRedirect).toBe(true);

        const parsedConfig2 = parseAppConfig('sampleApp', {
          ...defaultAppConfig,
          reactRouterV5LinkOptions: {
            useRedirect: false,
          },
        });
        expect(parsedConfig2.routeLinkOptions.ReactRouterV5.useRedirect).toBe(false);
      });

      it('should parse useParams correctly', () => {
        const parsedConfig = parseAppConfig('sampleApp', {
          ...defaultAppConfig,
          reactRouterV5LinkOptions: {
            useParams: true,
          },
        });
        expect(parsedConfig.routeLinkOptions.ReactRouterV5.useParams).toBe(true);

        const parsedConfig2 = parseAppConfig('sampleApp', {
          ...defaultAppConfig,
          reactRouterV5LinkOptions: {
            useParams: false,
          },
        });
        expect(parsedConfig2.routeLinkOptions.ReactRouterV5.useParams).toBe(false);
      });

      it('should throw error if no "componentDefaultImport" or "componentNamedImport" imports', () => {
        expect(() =>
          parseAppConfig('sampleApp', {
            ...defaultAppConfig,
            reactRouterV5LinkOptions: {
              importCustomLink: {
                propsNamedImport: 'CustomLinkProps',
                hrefProp: 'customHref',
                from: 'path/to/CustomLink',
              },
            },
          })
        ).toThrowError(
          'sampleApp.reactRouterV5LinkOptions.importCustomLink - either "componentNamedImport" or "componentDefaultImport" is required'
        );
      });

      it('should throw error if no "propsNamedImport"', () => {
        expect(() =>
          parseAppConfig('sampleApp', {
            ...defaultAppConfig,
            reactRouterV5LinkOptions: {
              importCustomLink: {
                componentDefaultImport: true,
                hrefProp: 'customHref',
                from: 'path/to/CustomLink',
              },
            },
          })
        ).toThrowError('sampleApp.reactRouterV5LinkOptions.importCustomLink - "propsNamedImport" is required');
      });

      it('should throw error if no "hrefProp"', () => {
        expect(() =>
          parseAppConfig('sampleApp', {
            ...defaultAppConfig,
            reactRouterV5LinkOptions: {
              importCustomLink: {
                componentDefaultImport: true,
                propsNamedImport: 'CustomLinkProps',
                from: 'path/to/CustomLink',
              },
            },
          })
        ).toThrowError('sampleApp.reactRouterV5LinkOptions.importCustomLink - "hrefProp" is required');
      });

      it('should throw error if no "from"', () => {
        expect(() =>
          parseAppConfig('sampleApp', {
            ...defaultAppConfig,
            reactRouterV5LinkOptions: {
              importCustomLink: {
                componentDefaultImport: true,
                propsNamedImport: 'CustomLinkProps',
                hrefProp: 'customHref',
              },
            },
          })
        ).toThrowError('sampleApp.reactRouterV5LinkOptions.importCustomLink - "from" is required');
      });
    });

    describe('NextJS', () => {
      it('should parse importCustomLink correctly', () => {
        const parsedConfig = parseAppConfig('sampleApp', {
          ...defaultAppConfig,
          nextJSLinkOptions: {
            importCustomLink: {
              componentDefaultImport: true,
              propsNamedImport: 'CustomLinkProps',
              hrefProp: 'customHref',
              from: 'path/to/CustomLink',
            },
          },
        });

        expect(parsedConfig.routeLinkOptions.NextJS).toEqual({
          importLink: {
            from: 'path/to/CustomLink',
            defaultImport: 'Link',
            namedImports: [{ name: 'CustomLinkProps' }],
          },
          linkComponent: 'Link',
          linkProps: 'CustomLinkProps',
          hrefProp: 'customHref',
        });
      });

      it('should parse "componentNamedImport" correctly', () => {
        const parsedConfig = parseAppConfig('sampleApp', {
          ...defaultAppConfig,
          nextJSLinkOptions: {
            importCustomLink: {
              componentNamedImport: 'CustomLinkComponent',
              propsNamedImport: 'CustomLinkProps',
              hrefProp: 'customHref',
              from: 'path/to/CustomLink',
            },
          },
        });

        expect(parsedConfig.routeLinkOptions.NextJS).toEqual({
          importLink: {
            from: 'path/to/CustomLink',
            namedImports: [{ name: 'CustomLinkProps' }, { name: 'CustomLinkComponent', importAs: 'Link' }],
          },
          linkComponent: 'Link',
          linkProps: 'CustomLinkProps',
          hrefProp: 'customHref',
        });
      });

      it('should throw error if no "componentDefaultImport" or "componentNamedImport" imports', () => {
        expect(() =>
          parseAppConfig('sampleApp', {
            ...defaultAppConfig,
            nextJSLinkOptions: {
              importCustomLink: {
                propsNamedImport: 'CustomLinkProps',
                hrefProp: 'customHref',
                from: 'path/to/CustomLink',
              },
            },
          })
        ).toThrowError(
          'sampleApp.nextJSLinkOptions.importCustomLink - either "componentNamedImport" or "componentDefaultImport" is required'
        );
      });

      it('should throw error if no "propsNamedImport"', () => {
        expect(() =>
          parseAppConfig('sampleApp', {
            ...defaultAppConfig,
            nextJSLinkOptions: {
              importCustomLink: {
                componentDefaultImport: true,
                hrefProp: 'customHref',
                from: 'path/to/CustomLink',
              },
            },
          })
        ).toThrowError('sampleApp.nextJSLinkOptions.importCustomLink - "propsNamedImport" is required');
      });

      it('should throw error if no "hrefProp"', () => {
        expect(() =>
          parseAppConfig('sampleApp', {
            ...defaultAppConfig,
            nextJSLinkOptions: {
              importCustomLink: {
                componentDefaultImport: true,
                propsNamedImport: 'CustomLinkProps',
                from: 'path/to/CustomLink',
              },
            },
          })
        ).toThrowError('sampleApp.nextJSLinkOptions.importCustomLink - "hrefProp" is required');
      });

      it('should throw error if no "from"', () => {
        expect(() =>
          parseAppConfig('sampleApp', {
            ...defaultAppConfig,
            nextJSLinkOptions: {
              importCustomLink: {
                componentDefaultImport: true,
                propsNamedImport: 'CustomLinkProps',
                hrefProp: 'customHref',
              },
            },
          })
        ).toThrowError('sampleApp.nextJSLinkOptions.importCustomLink - "from" is required');
      });
    });

    describe('Default', () => {
      it('should parse importCustomLink correctly', () => {
        const parsedConfig = parseAppConfig('sampleApp', {
          ...defaultAppConfig,
          defaultLinkOptions: {
            importCustomLink: {
              componentDefaultImport: true,
              propsNamedImport: 'CustomLinkProps',
              hrefProp: 'customHref',
              from: 'path/to/CustomLink',
            },
          },
        });

        expect(parsedConfig.routeLinkOptions.Default).toEqual({
          importLink: {
            from: 'path/to/CustomLink',
            defaultImport: 'Link',
            namedImports: [{ name: 'CustomLinkProps' }],
          },
          linkComponent: 'Link',
          linkProps: 'CustomLinkProps',
          hrefProp: 'customHref',
        });
      });

      it('should parse "componentNamedImport" correctly', () => {
        const parsedConfig = parseAppConfig('sampleApp', {
          ...defaultAppConfig,
          defaultLinkOptions: {
            importCustomLink: {
              componentNamedImport: 'CustomLinkComponent',
              propsNamedImport: 'CustomLinkProps',
              hrefProp: 'customHref',
              from: 'path/to/CustomLink',
            },
          },
        });

        expect(parsedConfig.routeLinkOptions.Default).toEqual({
          importLink: {
            from: 'path/to/CustomLink',
            namedImports: [{ name: 'CustomLinkProps' }, { name: 'CustomLinkComponent', importAs: 'Link' }],
          },
          linkComponent: 'Link',
          linkProps: 'CustomLinkProps',
          hrefProp: 'customHref',
        });
      });

      it('should throw error if no "componentDefaultImport" or "componentNamedImport" imports', () => {
        expect(() =>
          parseAppConfig('sampleApp', {
            ...defaultAppConfig,
            defaultLinkOptions: {
              importCustomLink: {
                propsNamedImport: 'CustomLinkProps',
                hrefProp: 'customHref',
                from: 'path/to/CustomLink',
              },
            },
          })
        ).toThrowError(
          'sampleApp.defaultLinkOptions.importCustomLink - either "componentNamedImport" or "componentDefaultImport" is required'
        );
      });

      it('should throw error if no "propsNamedImport"', () => {
        expect(() =>
          parseAppConfig('sampleApp', {
            ...defaultAppConfig,
            defaultLinkOptions: {
              importCustomLink: {
                componentDefaultImport: true,
                hrefProp: 'customHref',
                from: 'path/to/CustomLink',
              },
            },
          })
        ).toThrowError('sampleApp.defaultLinkOptions.importCustomLink - "propsNamedImport" is required');
      });

      it('should throw error if no "hrefProp"', () => {
        expect(() =>
          parseAppConfig('sampleApp', {
            ...defaultAppConfig,
            defaultLinkOptions: {
              importCustomLink: {
                componentDefaultImport: true,
                propsNamedImport: 'CustomLinkProps',
                from: 'path/to/CustomLink',
              },
            },
          })
        ).toThrowError('sampleApp.defaultLinkOptions.importCustomLink - "hrefProp" is required');
      });

      it('should throw error if no "from"', () => {
        expect(() =>
          parseAppConfig('sampleApp', {
            ...defaultAppConfig,
            defaultLinkOptions: {
              importCustomLink: {
                componentDefaultImport: true,
                propsNamedImport: 'CustomLinkProps',
                hrefProp: 'customHref',
              },
            },
          })
        ).toThrowError('sampleApp.defaultLinkOptions.importCustomLink - "from" is required');
      });
    });
  });
});
