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

    const routeFieldTemplates = files.reduce<string[]>((templateChunks, file) => {
      if (!templateFileHelpers.isPatternTemplateFile(file)) {
        return templateChunks;
      }

      const template = `${file.routeName}: ${file.routingType === "route-external" ? externalComponentName : internalComponentName},`;

      return [...templateChunks, template];
    }, []);

    const template = [
      printImport(internalComponent),
      printImport(externalComponent),
      "export const routeConfig = {",
      ...routeFieldTemplates,
      "}",
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
