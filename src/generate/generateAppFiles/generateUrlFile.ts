import { TemplateFile, Import } from '../types';
import { RoutePatternNamedExports } from './generateRoutePatternFile';
import printImport from '../utils/printImport';

type GenerateUrlFile = (params: {
  importGenerateUrl: Import;
  routePatternNamedExports: RoutePatternNamedExports;
  routeName: string;
  destinationDir: string;
}) => TemplateFile;

const generateUrlFile: GenerateUrlFile = ({
  importGenerateUrl,
  routePatternNamedExports: { pathPatternName, urlPartsInterfaceName, filename, pathParamsInterfaceName },
  routeName,
  destinationDir,
}) => {
  const functionName = `generateUrl${routeName}`;
  const pathVariable = pathParamsInterfaceName ? 'urlParts.path' : '{}';

  const template = `${printImport(importGenerateUrl)}
  ${printImport({
    namedImports: [{ name: pathPatternName }, { name: urlPartsInterfaceName }],
    from: `./${filename}`,
  })}
  const ${functionName} = ( urlParts: ${urlPartsInterfaceName} ) => generateUrl(${pathPatternName}, ${pathVariable}, urlParts.urlQuery);
  export default ${functionName};
  `;

  const templateFile: TemplateFile = {
    template,
    filename: functionName,
    extension: '.ts',
    destinationDir,
  };

  return templateFile;
};

export default generateUrlFile;
