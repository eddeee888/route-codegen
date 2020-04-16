import { TemplateFile } from '../../types';
import printImport from '../../utils/printImport';

export interface GenerateUseParamsFileReactRouterV5Params {
  routeName: string;
  destinationDir: string;
  patternName: string;
  pathParamsInterfaceName: string;
  pathParamsFilename: string;
}

const generateUseParamsFileReactRouterV5 = (params: GenerateUseParamsFileReactRouterV5Params): TemplateFile => {
  const { routeName, destinationDir, patternName, pathParamsInterfaceName, pathParamsFilename } = params;

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

export default generateUseParamsFileReactRouterV5;
