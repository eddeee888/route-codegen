import { Import } from '../../types';

const printImport = ({ namedImports, from, defaultImport }: Import): string => {
  const defaultImportTemplate = defaultImport ? `${defaultImport}` : '';
  const namedImportsTemplate = namedImports
    ? '{' + namedImports.map(({ name, importAs }) => `${name}${importAs ? ` as ${importAs}` : ''},`).join('') + '}'
    : '';

  return `import ${defaultImportTemplate} ${namedImportsTemplate} from '${from}'`;
};

export default printImport;
