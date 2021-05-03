import {
  GeneratedFilesProcessorCodegenPlugin,
  GeneratedFilesProcessorPluginBaseConfig,
  Import,
  info,
  PatternTemplateFile,
  printImport,
  TemplateFile,
  templateFileHelpers,
  throwError,
  WithExtraConfig,
} from "../../utils";

const getComponentName = (importMeta: Import): string => {
  if (importMeta.defaultImport) {
    return importMeta.defaultImport;
  }

  if (importMeta.namedImports) {
    if (importMeta.namedImports.length > 1) {
      info([], "namedImports has more than one value. Only using the first one.");
    }
    const [namedImport] = importMeta.namedImports;
    return namedImport.importAs || namedImport.name;
  }

  return throwError([], "Import must have namedImports or defaultImport");
};

interface ExtraConfig {
  internalComponent?: Import;
  externalComponent?: Import;
}

export type TypescriptRouteConfigPluginConfig = WithExtraConfig<GeneratedFilesProcessorPluginBaseConfig, ExtraConfig>;

export const plugin: GeneratedFilesProcessorCodegenPlugin<ExtraConfig> = {
  type: "generated-files-processor",
  generate: ({ destinationDir, files, extraConfig }) => {
    if (!extraConfig) {
      return throwError(["type-route-config"], "internalComponent and externalComponent are required");
    }

    const { internalComponent, externalComponent } = extraConfig;

    if (!internalComponent || !externalComponent) {
      return throwError(["type-route-config"], "internalComponent and externalComponent are required");
    }

    const patternFiles = files.reduce<PatternTemplateFile[]>((result, file) => {
      if (templateFileHelpers.isPatternTemplateFile(file)) {
        return [...result, file];
      }
      return result;
    }, []);

    if (patternFiles.length < 1) {
      return [];
    }

    const internalComponentName = getComponentName(internalComponent);
    const externalComponentName = getComponentName(externalComponent);

    const templates = patternFiles.reduce<{ fields: string[]; interfaces: string[]; imports: Import[] }>(
      (templateMap, file) => {
        const fieldTemplate = `${file.routeName}: {
          pathPattern: ${file.namedExports.patternName},
          Component: ${file.routingType === "route-external" ? externalComponentName : internalComponentName}
        },`;

        const urlParamsModifier = file.namedExports.pathParamsInterfaceName ? "" : "?";
        const interfaceTemplate = `{ to: '${file.routeName}', urlParams${urlParamsModifier}: ${file.namedExports.urlParamsInterfaceName} }`;

        const variableImports: Import = {
          from: `./${file.routeName}/${file.filename}`,
          namedImports: [{ name: file.namedExports.urlParamsInterfaceName }, { name: file.namedExports.patternName }],
        };

        return {
          ...templateMap,
          fields: [...templateMap.fields, fieldTemplate],
          interfaces: [...templateMap.interfaces, interfaceTemplate],
          imports: [...templateMap.imports, variableImports],
        };
      },
      { fields: [], interfaces: [], imports: [] }
    );

    const template = [
      printImport(internalComponent),
      printImport(externalComponent),
      templates.imports.map(printImport).join(";"),

      "export const routeConfig = {",
      ...templates.fields,
      "}",

      "export type RouteConfigProps = ",
      templates.interfaces.join("|"),
    ].join("\n");

    const file: TemplateFile = {
      destinationDir: destinationDir,
      extension: ".ts",
      filename: "routeConfig",
      hasDefaultExport: false,
      hasNamedExports: true,
      template,
      routeName: "",
    };

    return [file];
  },
};
