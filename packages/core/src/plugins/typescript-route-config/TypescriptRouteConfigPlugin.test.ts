import { PatternTemplateFile, TemplateFile } from "../../utils";
import { plugin, TypescriptRouteConfigPluginConfig } from "./TypescriptRouteConfigPlugin";

describe("TypescriptRouteConfig", () => {
  const generalTemplateFile: TemplateFile = {
    destinationDir: "routes",
    extension: ".ts",
    filename: "LinkFile",
    hasDefaultExport: false,
    hasNamedExports: true,
    routeName: "login",
    template: "something not important",
  };

  const internalPatternTemplateFile: PatternTemplateFile = {
    type: "pattern",
    destinationDir: "routes",
    extension: ".ts",
    filename: "patternAbout",
    hasDefaultExport: false,
    hasNamedExports: true,
    routeName: "about",
    template: "something not important",
    routingType: "route-internal",
    namedExports: {
      filename: "patternAbout",
      originName: "",
      patternName: "patternAbout",
      urlParamsInterfaceName: "urlParamsAbout",
    },
  };

  const internalPatternTemplateFileWithPathParams: PatternTemplateFile = {
    type: "pattern",
    destinationDir: "routes",
    extension: ".ts",
    filename: "patternUser",
    hasDefaultExport: false,
    hasNamedExports: true,
    routeName: "user",
    template: "something not important",
    routingType: "route-internal",
    namedExports: {
      filename: "patternUser",
      originName: "",
      patternName: "patternUser",
      urlParamsInterfaceName: "urlParamsUser",
      pathParamsInterfaceName: "PathParamsUser",
    },
  };

  const externalPatternTemplateFile: PatternTemplateFile = {
    type: "pattern",
    destinationDir: "routes",
    extension: ".ts",
    filename: "patternTerms",
    hasDefaultExport: false,
    hasNamedExports: true,
    routeName: "terms",
    template: "something not important",
    routingType: "route-external",
    namedExports: {
      filename: "patternTerms",
      originName: "",
      patternName: "patternTerms",
      urlParamsInterfaceName: "urlParamsTerms",
    },
  };

  const externalPatternTemplateFileWithPathParams: PatternTemplateFile = {
    type: "pattern",
    destinationDir: "routes",
    extension: ".ts",
    filename: "patternProject",
    hasDefaultExport: false,
    hasNamedExports: true,
    routeName: "terms",
    template: "something not important",
    routingType: "route-external",
    namedExports: {
      filename: "patternProject",
      originName: "",
      patternName: "patternProject",
      urlParamsInterfaceName: "urlParamsProject",
      pathParamsInterfaceName: "pathParamsProject",
    },
  };

  const defaultConfig: TypescriptRouteConfigPluginConfig = {
    destinationDir: "apps/",
    files: [],
    extraConfig: {
      internalComponent: "a",
      externalComponent: {
        from: "~/common/Link",
        defaultImport: "Link",
      },
    },
  };

  it("creates TemplateFile without component config", () => {
    const result = plugin.generate({
      ...defaultConfig,
      files: [
        internalPatternTemplateFile,
        internalPatternTemplateFileWithPathParams,
        externalPatternTemplateFile,
        externalPatternTemplateFileWithPathParams,
      ],
      extraConfig: undefined,
    });

    expect(result).toHaveLength(1);

    const [file] = result;

    expect(file.type).toBe(undefined);
    expect(file.destinationDir).toBe("apps/");
    expect(file.extension).toBe(".ts");
    expect(file.filename).toBe("routeConfig");
    expect(file.hasDefaultExport).toBe(false);
    expect(file.hasNamedExports).toBe(true);
    expect(file.routeName).toBe("");
    expect(file.template).toMatchInlineSnapshot(`
      "

      import {urlParamsAbout,patternAbout,} from './about/patternAbout';import {urlParamsUser,patternUser,} from './user/patternUser';import {urlParamsTerms,patternTerms,} from './terms/patternTerms';import {urlParamsProject,patternProject,} from './terms/patternProject'
      export const routeConfig: Record<string, { pathPattern:  string } 
            & ( { type: \\"external\\"  } 
              | { type: \\"internal\\"  })> = {
      about: {
                pathPattern: patternAbout,
                type: \\"internal\\",
                
              },
      user: {
                pathPattern: patternUser,
                type: \\"internal\\",
                
              },
      terms: {
                pathPattern: patternTerms,
                type: \\"external\\",
                
              },
      terms: {
                pathPattern: patternProject,
                type: \\"external\\",
                
              },
      }
      export type RouteConfigProps = 
      { to: 'about', urlParams?: urlParamsAbout }|{ to: 'user', urlParams: urlParamsUser }|{ to: 'terms', urlParams?: urlParamsTerms }|{ to: 'terms', urlParams: urlParamsProject }"
    `);
  });

  it("returns no file if no file supplied", () => {
    const results = plugin.generate({ ...defaultConfig, files: [] });
    expect(results).toHaveLength(0);
  });

  it("returns no file if no pattern file provided", () => {
    const results = plugin.generate({ ...defaultConfig, files: [generalTemplateFile] });
    expect(results).toHaveLength(0);
  });

  it("throws error import/s do not have default or named imports", () => {
    expect(() =>
      plugin.generate({
        ...defaultConfig,
        extraConfig: {
          ...defaultConfig.extraConfig,
          externalComponent: {
            from: "~/common/Link",
          },
        },
        files: [internalPatternTemplateFileWithPathParams],
      })
    ).toThrow("Import must have namedImports or defaultImport");
  });

  it("creates TemplateFile correctly", () => {
    const result = plugin.generate({
      ...defaultConfig,
      files: [
        internalPatternTemplateFile,
        internalPatternTemplateFileWithPathParams,
        externalPatternTemplateFile,
        externalPatternTemplateFileWithPathParams,
      ],
    });

    expect(result).toHaveLength(1);

    const [file] = result;

    expect(file.type).toBe(undefined);
    expect(file.destinationDir).toBe("apps/");
    expect(file.extension).toBe(".ts");
    expect(file.filename).toBe("routeConfig");
    expect(file.hasDefaultExport).toBe(false);
    expect(file.hasNamedExports).toBe(true);
    expect(file.routeName).toBe("");
    expect(file.template).toMatchInlineSnapshot(`
      "
      import Link from '~/common/Link'
      import {urlParamsAbout,patternAbout,} from './about/patternAbout';import {urlParamsUser,patternUser,} from './user/patternUser';import {urlParamsTerms,patternTerms,} from './terms/patternTerms';import {urlParamsProject,patternProject,} from './terms/patternProject'
      export const routeConfig: Record<string, { pathPattern:  string } 
            & ( { type: \\"external\\" , component: typeof Link } 
              | { type: \\"internal\\" , component: \\"a\\" })> = {
      about: {
                pathPattern: patternAbout,
                type: \\"internal\\",
                component: \\"a\\",
              },
      user: {
                pathPattern: patternUser,
                type: \\"internal\\",
                component: \\"a\\",
              },
      terms: {
                pathPattern: patternTerms,
                type: \\"external\\",
                component: Link,
              },
      terms: {
                pathPattern: patternProject,
                type: \\"external\\",
                component: Link,
              },
      }
      export type RouteConfigProps = 
      { to: 'about', urlParams?: urlParamsAbout }|{ to: 'user', urlParams: urlParamsUser }|{ to: 'terms', urlParams?: urlParamsTerms }|{ to: 'terms', urlParams: urlParamsProject }"
    `);
  });
});
