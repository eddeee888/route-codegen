import { TemplateFile } from '../types';
import printImport from '../utils/printImport';

type GenerateUseParams = (params: {
  routeName: string;
  destinationDir: string;
  pathParamsInterfaceName: string;
  pathParamsFilename: string;
}) => TemplateFile;

const generateUseParams: GenerateUseParams = ({
  routeName,
  destinationDir,
  pathParamsInterfaceName,
  pathParamsFilename,
}) => {
  const functionName = `useParams${routeName}`;

  const template = `
    ${printImport({ namedImports: [{ name: pathParamsInterfaceName }], from: pathParamsFilename })}
    const ${functionName} = (): ${pathParamsInterfaceName} => {
      const { path, params } = useRouteMatch<${pathParamsInterfaceName}>();
  
      if (path !== pattern) {
        const error = \`You are trying to use useParams for "${'${pattern}'}" in "${'${path}'}". Make sure you are using the right route link object!\`;
        throw new Error(error);
      }
  
      return params;
    }

    export default ${functionName};
`;

  return {
    template,
    extension: '.ts',
    filename: routeName,
    destinationDir,
  };
};

export default generateUseParams;
