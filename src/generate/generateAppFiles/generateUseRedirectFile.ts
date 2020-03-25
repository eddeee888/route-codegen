import { RoutePatternNamedExports } from './generateRoutePatternFile';
import printImport from '../utils/printImport';
import { TemplateFile, Import } from '../types';

type GenerateUseRedirectFile = (params: {
  routeName: string;
  routePatternNamedExports: RoutePatternNamedExports;
  destinationDir: string;
  importGenerateUrl: Import;
}) => TemplateFile;

const generateUseRedirectFile: GenerateUseRedirectFile = ({
  routeName,
  routePatternNamedExports,
  destinationDir,
  importGenerateUrl,
}) => {
  const functionName = `useRedirect${routeName}`;

  const template = `${printImport({
    namedImports: [{ name: 'useHistory' }],
    from: 'react-router',
  })}
  ${printImport({
    namedImports: [
      { name: routePatternNamedExports.urlPartsInterfaceName },
      { name: routePatternNamedExports.pathPatternName },
    ],
    from: `./${routePatternNamedExports.filename}`,
  })}
  ${printImport(importGenerateUrl)}
  
  const ${functionName} = ( urlParts: ${routePatternNamedExports.urlPartsInterfaceName} ): (() => void) => {
    const history = useHistory();
    const to = generateUrl(${routePatternNamedExports.pathPatternName}, ${
    routePatternNamedExports.pathParamsInterfaceName ? 'urlParts.path' : '{}'
  }, urlParts.urlQuery);
    return () => history.push(to);
  }
  export default ${functionName}`;

  const templateFile: TemplateFile = {
    template,
    filename: functionName,
    extension: '.ts',
    destinationDir,
  };

  return templateFile;
};

export default generateUseRedirectFile;
