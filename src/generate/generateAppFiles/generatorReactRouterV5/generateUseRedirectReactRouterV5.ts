import { PatternNamedExports } from '../generatePatternFile';
import printImport from '../../utils/printImport';
import { TemplateFile, Import } from '../../types';

export interface GenerateUseRedirectReactRouterV5Params {
  routeName: string;
  patternNamedExports: PatternNamedExports;
  destinationDir: string;
  importGenerateUrl: Import;
}

const generateUseRedirectReactRouterV5 = (params: GenerateUseRedirectReactRouterV5Params): TemplateFile => {
  const { routeName, patternNamedExports, destinationDir, importGenerateUrl } = params;
  const functionName = `useRedirect${routeName}`;

  const template = `${printImport({
    namedImports: [{ name: 'useHistory' }],
    from: 'react-router',
  })}
  ${printImport({
    namedImports: [{ name: patternNamedExports.urlPartsInterfaceName }, { name: patternNamedExports.patternName }],
    from: `./${patternNamedExports.filename}`,
  })}
  ${printImport(importGenerateUrl)}
  
  const ${functionName} = ( urlParts: ${patternNamedExports.urlPartsInterfaceName} ): (() => void) => {
    const history = useHistory();
    const to = generateUrl(${patternNamedExports.patternName}, ${
    patternNamedExports.pathParamsInterfaceName ? 'urlParts.path' : '{}'
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

export default generateUseRedirectReactRouterV5;
