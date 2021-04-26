import { Import } from "../types";

export const printImport = ({ namedImports, from, defaultImport }: Import): string => {
  const defaultImportTemplate = defaultImport ? `${defaultImport}` : "";
  const namedImportsTemplate = namedImports
    ? "{" + namedImports.map(({ name, importAs }) => `${name}${importAs ? ` as ${importAs}` : ""},`).join("") + "}"
    : "";

  let imports = "";
  if (defaultImportTemplate && namedImportsTemplate) {
    imports = `${defaultImportTemplate}, ${namedImportsTemplate}`;
  } else if (defaultImportTemplate && !namedImportsTemplate) {
    imports = defaultImportTemplate;
  } else if (!defaultImportTemplate && namedImportsTemplate) {
    imports = namedImportsTemplate;
  } else {
    throw new Error("Unable to printing an import line without default or named");
  }

  return `import ${imports} from '${from}'`;
};
