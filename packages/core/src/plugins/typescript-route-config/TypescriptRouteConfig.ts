import {
  GeneratedFilesProcessorCodegenPlugin,
  Import,
  info,
  printImport,
  TemplateFile,
  templateFileHelpers,
  throwError,
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

export const plugin: GeneratedFilesProcessorCodegenPlugin<{ internalComponent?: Import; externalComponent?: Import }> = {
  type: "generated-files-processor",
  generate: ({ destinationDir, files, internalComponent, externalComponent }) => {
    if (!internalComponent || !externalComponent) {
      return throwError(["type-route-config"], "internalComponent and externalComponent are required");
    }

    const internalComponentName = getComponentName(internalComponent);
    const externalComponentName = getComponentName(externalComponent);

    const templates = files.reduce<{ fields: string[]; interfaces: string[]; imports: Import[] }>(
      (templateMap, file) => {
        if (!templateFileHelpers.isPatternTemplateFile(file)) {
          return templateMap;
        }

        const fieldTemplate = `${file.routeName}: {
          pattern: ${file.namedExports.patternName},
          component: ${file.routingType === "route-external" ? externalComponentName : internalComponentName}
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

      "export type RouteConfigParams = ",
      templates.interfaces.join("&"),
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
