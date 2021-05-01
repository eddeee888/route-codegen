import { ImportCustomLink, Import } from "../types";
import { throwError } from "../throwError";
import { info } from "../info";

interface HandleImportCustomLinkParams {
  appName: string;
  linkOptionName: string;
  importCustomLink: ImportCustomLink;
}

interface HandleImportCustomLinkResult {
  importLink: Import;
  hrefProp: string;
  linkComponent: string;
  linkProps: string;
}

export const handleImportCustomLink = (params: HandleImportCustomLinkParams): HandleImportCustomLinkResult => {
  const { appName, importCustomLink, linkOptionName } = params;

  const errorPath = [appName, linkOptionName, "importCustomLink"];
  const { from, componentDefaultImport, componentNamedImport, propsNamedImport, hrefProp } = importCustomLink;
  if (!from) {
    return throwError(errorPath, '"from" is required');
  }
  if (!componentNamedImport && !componentDefaultImport) {
    return throwError(errorPath, 'either "componentNamedImport" or "componentDefaultImport" is required');
  }
  if (!propsNamedImport) {
    return throwError(errorPath, '"propsNamedImport" is required');
  }
  if (!hrefProp) {
    return throwError(errorPath, '"hrefProp" is required');
  }
  if (componentNamedImport && componentDefaultImport) {
    info(errorPath, '"componentNamedImport" and "componentDefaultImport" are supplied. "componentDefaultImport" will be used');
  }

  const linkComponent = "Link";

  const finalImportCustomLink: Import = componentNamedImport
    ? {
        from,
        namedImports: [{ name: propsNamedImport }, { name: componentNamedImport, importAs: linkComponent }],
      }
    : {
        from,
        defaultImport: linkComponent,
        namedImports: [{ name: propsNamedImport }],
      };

  return { importLink: finalImportCustomLink, hrefProp, linkComponent, linkProps: propsNamedImport };
};
