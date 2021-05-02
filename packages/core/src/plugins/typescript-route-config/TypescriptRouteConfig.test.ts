import { GeneratedFilesProcessorPluginBaseConfig, PatternTemplateFile, TemplateFile } from "../../utils";
import { plugin, GeneratedFilesProcessorCodegenPluginExtraConfig } from "./TypescriptRouteConfig";

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

  const defaultConfig: GeneratedFilesProcessorPluginBaseConfig & GeneratedFilesProcessorCodegenPluginExtraConfig = {
    destinationDir: "apps/",
    files: [],
    internalComponent: {
      from: "~/common/Anchor",
      defaultImport: "Anchor",
    },
    externalComponent: {
      from: "~/common/Link",
      defaultImport: "Link",
    },
  };

  it("throws error if internalComponent or externalComponent is not provided", () => {
    expect(() => plugin.generate({ ...defaultConfig, internalComponent: undefined, externalComponent: undefined })).toThrow(
      "internalComponent and externalComponent are required"
    );

    expect(() => plugin.generate({ ...defaultConfig, externalComponent: undefined })).toThrow(
      "internalComponent and externalComponent are required"
    );

    expect(() => plugin.generate({ ...defaultConfig, internalComponent: undefined })).toThrow(
      "internalComponent and externalComponent are required"
    );

    expect(() => plugin.generate({ ...defaultConfig })).not.toThrow("internalComponent and externalComponent are required");
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
        externalComponent: {
          from: "~/common/Link",
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
      "import Anchor from '~/common/Anchor'
      import Link from '~/common/Link'
      import {urlParamsAbout,patternAbout,} from './about/patternAbout';import {urlParamsUser,patternUser,} from './user/patternUser';import {urlParamsTerms,patternTerms,} from './terms/patternTerms';import {urlParamsProject,patternProject,} from './terms/patternProject'
      export const routeConfig = {
      about: {
                pattern: patternAbout,
                component: Anchor
              },
      user: {
                pattern: patternUser,
                component: Anchor
              },
      terms: {
                pattern: patternTerms,
                component: Link
              },
      terms: {
                pattern: patternProject,
                component: Link
              },
      }
      export type RouteConfigProps = 
      { to: 'about', urlParams?: urlParamsAbout }|{ to: 'user', urlParams: urlParamsUser }|{ to: 'terms', urlParams?: urlParamsTerms }|{ to: 'terms', urlParams: urlParamsProject }"
    `);
  });
});
