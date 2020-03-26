import { TemplateFile } from '../types';
import printImport from '../utils/printImport';

type GenerateUseParamsFile = (params: {
  routeName: string;
  destinationDir: string;
  patternName: string;
  pathParamsInterfaceName: string;
  pathParamsFilename: string;
}) => TemplateFile;

const generateUseParamsFile: GenerateUseParamsFile = ({
  routeName,
  destinationDir,
  patternName,
  pathParamsInterfaceName,
  pathParamsFilename,
}) => {
  const functionName = `useParams${routeName}`;

  const template = `${printImport({
    namedImports: [{ name: pathParamsInterfaceName }, { name: patternName, importAs: 'pattern' }],
    from: `./${pathParamsFilename}`,
  })}
    ${printImport({
      namedImports: [{ name: 'useRouteMatch' }],
      from: 'react-router',
    })}
    const ${functionName} = (): ${pathParamsInterfaceName} => {
      const { path, params } = useRouteMatch<${pathParamsInterfaceName}>();
      if (path !== pattern) {
        const error = \`You are trying to use useParams for "${'${pattern}'}" in "${'${path}'}". Make sure you are using the right route link object!\`;
        throw new Error(error);
      }
      return params;
    }
    export default ${functionName};`;

  return {
    template,
    extension: '.ts',
    filename: functionName,
    destinationDir,
  };
};

export default generateUseParamsFile;
