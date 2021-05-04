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

interface ComponentMeta {
  import?: Import;
  componentName: string;
  typeTemplate: string;
}

const getComponentMeta = (componentConfig: string | Import): ComponentMeta => {
  // If componentConfig is a string, it is the "key" used to recognise
  // which type of component the app needs.
  if (typeof componentConfig === "string") {
    return {
      import: undefined,
      componentName: `"${componentConfig}"`,
      typeTemplate: `"${componentConfig}"`,
    };
  }

  if (componentConfig.defaultImport) {
    return {
      import: componentConfig,
      componentName: componentConfig.defaultImport,
      typeTemplate: `typeof ${componentConfig.defaultImport}`,
    };
  }

  if (componentConfig.namedImports) {
    if (componentConfig.namedImports.length > 1) {
      info([], "namedImports has more than one value. Only using the first one.");
    }
    const [namedImport] = componentConfig.namedImports;
    const componentName = namedImport.importAs || namedImport.name;
    return {
      import: componentConfig,
      componentName: componentName,
      typeTemplate: `typeof ${componentName}`,
    };
  }

  return throwError([], "Import must have namedImports or defaultImport");
};

interface ExtraConfig {
  internalComponent?: string | Import;
  externalComponent?: string | Import;
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

    const internalComponentMeta = getComponentMeta(internalComponent);
    const externalComponentMeta = getComponentMeta(externalComponent);

    const templates = patternFiles.reduce<{ fields: string[]; interfaces: string[]; imports: Import[] }>(
      (templateMap, file) => {
        const fieldTemplate = `${file.routeName}: {
          pathPattern: ${file.namedExports.patternName},
          component: ${file.routingType === "route-external" ? externalComponentMeta.componentName : internalComponentMeta.componentName},
          type: ${file.routingType === "route-external" ? '"external"' : '"internal"'},
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

    const routeConfigInterfaceTemplate = `Record<string, { pathPattern:  string } 
      & ( { type: "external", component: ${externalComponentMeta.typeTemplate} } 
        | { type: "internal", component: ${internalComponentMeta.typeTemplate} })>`;

    const template = [
      internalComponentMeta.import ? printImport(internalComponentMeta.import) : "",
      externalComponentMeta.import ? printImport(externalComponentMeta.import) : "",
      templates.imports.map(printImport).join(";"),

      `export const routeConfig: ${routeConfigInterfaceTemplate} = {`,
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
