import { TemplateFile, Import } from '../../types';
import printImport from '../../utils/printImport';
import { PatternNamedExports } from '../types';

export interface GenerateRedirectFileReactRouterV5Params {
  routeName: string;
  destinationDir: string;
  importGenerateUrl: Import;
  patternNamedExports: PatternNamedExports;
}

const generateRedirectFileReactRouterV5 = (params: GenerateRedirectFileReactRouterV5Params): TemplateFile => {
  const { routeName, destinationDir, importGenerateUrl, patternNamedExports } = params;

  const functionName = `Redirect${routeName}`;
  const hasPathParams = !!patternNamedExports.pathParamsInterfaceName;

  const template = `${printImport({ defaultImport: 'React', from: 'react' })}
  ${printImport(importGenerateUrl)}
  ${printImport({ namedImports: [{ name: 'Redirect' }], from: 'react-router' })}
  ${printImport({
    namedImports: [{ name: patternNamedExports.urlPartsInterfaceName }, { name: patternNamedExports.patternName }],
    from: `./${patternNamedExports.filename}`,
  })}
  const ${functionName}: React.FunctionComponent<${patternNamedExports.urlPartsInterfaceName}> = props => {
    const to = generateUrl(${patternNamedExports.patternName}, ${hasPathParams ? 'props.path' : '{}'}, props.urlQuery);
    return (
      <>
        <Redirect to={to} />
        {props.children}
      </>
    );
  };
  export default ${functionName}`;

  return {
    filename: functionName,
    destinationDir,
    extension: '.tsx',
    template,
  };
};

export default generateRedirectFileReactRouterV5;
