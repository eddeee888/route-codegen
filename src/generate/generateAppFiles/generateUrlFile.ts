import { TemplateFile, Import } from '../types';
import { PatternNamedExports } from './generatePatternFile';
import printImport from '../utils/printImport';

type GenerateUrlFile = (params: {
  importGenerateUrl: Import;
  patternNamedExports: PatternNamedExports;
  routeName: string;
  destinationDir: string;
}) => TemplateFile;

const generateUrlFile: GenerateUrlFile = ({
  importGenerateUrl,
  patternNamedExports: { patternName, urlPartsInterfaceName, filename, pathParamsInterfaceName },
  routeName,
  destinationDir,
}) => {
  const functionName = `generateUrl${routeName}`;
  const pathVariable = pathParamsInterfaceName ? 'urlParts.path' : '{}';

  const template = `${printImport(importGenerateUrl)}
  ${printImport({
    namedImports: [{ name: patternName }, { name: urlPartsInterfaceName }],
    from: `./${filename}`,
  })}
  const ${functionName} = ( urlParts: ${urlPartsInterfaceName} ) => generateUrl(${patternName}, ${pathVariable}, urlParts.urlQuery);
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
