import { PatternNamedExports } from './generatePatternFile';
import printImport from '../utils/printImport';
import { TemplateFile, Import } from '../types';

interface GenerateUseRedirectFileParams {
  routeName: string;
  patternNamedExports: PatternNamedExports;
  destinationDir: string;
  importGenerateUrl: Import;
}

const generateUseRedirectFileDefault = (params: GenerateUseRedirectFileParams): TemplateFile => {
  const { routeName, patternNamedExports, destinationDir, importGenerateUrl } = params;
  const functionName = `useRedirect${routeName}`;

  const template = `${printImport({
    namedImports: [{ name: patternNamedExports.urlPartsInterfaceName }, { name: patternNamedExports.patternName }],
    from: `./${patternNamedExports.filename}`,
  })}
  ${printImport(importGenerateUrl)}
  
  const ${functionName} = ( urlParts: ${patternNamedExports.urlPartsInterfaceName} ): (() => void) => {
    const to = generateUrl(${patternNamedExports.patternName}, ${
    patternNamedExports.pathParamsInterfaceName ? 'urlParts.path' : '{}'
  }, urlParts.urlQuery);
    return () => !!window && !!window.location ? window.location.href = to : undefined;
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

export default generateUseRedirectFileDefault;
