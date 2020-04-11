import { TemplateFile } from '../types';
import printImport from '../utils/printImport';
import { Key } from 'path-to-regexp';

interface GenerateUseParamsFileNextJSParams {
  routeName: string;
  destinationDir: string;
  pathParamsInterfaceName: string;
  pathParamsFilename: string;
  keys: Key[];
}

// NextJS useRouter simply returns all dynamic params as strings
const generateUseParamsFileNextJS = (params: GenerateUseParamsFileNextJSParams): TemplateFile => {
  const { routeName, destinationDir, pathParamsInterfaceName, pathParamsFilename, keys } = params;

  const functionName = `useParams${routeName}`;

  const template = `${printImport({
    namedImports: [{ name: pathParamsInterfaceName }],
    from: `./${pathParamsFilename}`,
  })}
    ${printImport({
      namedImports: [{ name: 'useRouter' }],
      from: 'next/router',
    })}
    const ${functionName} = (): ${pathParamsInterfaceName} => {
      const query = useRouter().query;
      return {${keys.reduce((prev, key) => `${prev}${key.name}: query.${key.name} as string,`, '')}};
    }
    export default ${functionName};`;

  return {
    template,
    extension: '.ts',
    filename: functionName,
    destinationDir,
  };
};

export default generateUseParamsFileNextJS;
