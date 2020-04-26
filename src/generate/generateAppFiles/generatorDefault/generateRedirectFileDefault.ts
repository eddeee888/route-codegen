import { TemplateFile, Import } from '../../types';
import printImport from '../../utils/printImport';
import { PatternNamedExports } from '../types';

export interface GenerateRedirectFileDefaultParams {
  routeName: string;
  destinationDir: string;
  importGenerateUrl: Import;
  patternNamedExports: PatternNamedExports;
}

const generateRedirectFileDefault = (params: GenerateRedirectFileDefaultParams): TemplateFile => {
  const { routeName, destinationDir, importGenerateUrl, patternNamedExports } = params;

  const functionName = `Redirect${routeName}`;
  const hasPathParams = !!patternNamedExports.pathParamsInterfaceName;

  const template = `${printImport({ defaultImport: 'React', namedImports: [{ name: 'useEffect' }], from: 'react' })}
  ${printImport(importGenerateUrl)}
  ${printImport({
    namedImports: [{ name: patternNamedExports.urlPartsInterfaceName }, { name: patternNamedExports.patternName }],
    from: `./${patternNamedExports.filename}`,
  })}
  const ${functionName}: React.FunctionComponent<${patternNamedExports.urlPartsInterfaceName}> = props => {
    const to = generateUrl(${patternNamedExports.patternName}, ${hasPathParams ? 'props.path' : '{}'}, props.urlQuery);
    useEffect(() => {
      if (window && window.location) {
        window.location.href = to;
      }
    }, [to]);
    return null;
  };
  export default ${functionName}`;

  return {
    filename: functionName,
    destinationDir,
    extension: '.tsx',
    template,
  };
};

export default generateRedirectFileDefault;
