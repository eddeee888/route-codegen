import generateRedirectFileDefault, { GenerateRedirectFileDefaultParams } from './generateRedirectFileDefault';

describe('generateRedirectFileDefault', () => {
  const defaultParams: GenerateRedirectFileDefaultParams = {
    importGenerateUrl: { namedImports: [{ name: 'generateUrl' }], from: 'route-codegen' },
    importRedirectServerSide: { defaultImport: 'RedirectServerSide', from: 'route-codegen/RedirectServerSide' },
    routeName: 'Login',
    patternNamedExports: {
      filename: 'patternLogin',
      patternName: 'patternLogin',
      urlPartsInterfaceName: 'UrlPartsLogin',
      patternNameNextJS: 'patternNextJSLogin',
    },
    destinationDir: 'path/to/routes',
  };

  it('should generate correctly if no path params', () => {
    const templateFile = generateRedirectFileDefault({ ...defaultParams });

    expect(templateFile.filename).toBe('RedirectLogin');
    expect(templateFile.extension).toBe('.tsx');
    expect(templateFile.destinationDir).toBe('path/to/routes');
    expect(templateFile.template).toContain(`import React from 'react'
  import RedirectServerSide from 'route-codegen/RedirectServerSide'
  import {generateUrl,} from 'route-codegen'
  import {UrlPartsLogin,patternLogin,} from './patternLogin'
  const RedirectLogin: React.FunctionComponent<UrlPartsLogin & { fallback?: React.ReactNode }> = props => {
    const to = generateUrl(patternLogin, {}, props.urlQuery);
    return <RedirectServerSide>{props.fallback}</RedirectServerSide>;
  };
  export default RedirectLogin`);
  });

  it('should generate correctly with path params', () => {
    const templateFile = generateRedirectFileDefault({
      ...defaultParams,
      patternNamedExports: {
        ...defaultParams.patternNamedExports,
        pathParamsInterfaceName: 'PathParamsLogin',
      },
    });

    expect(templateFile.filename).toBe('RedirectLogin');
    expect(templateFile.extension).toBe('.tsx');
    expect(templateFile.destinationDir).toBe('path/to/routes');
    expect(templateFile.template).toContain(`import React from 'react'
  import RedirectServerSide from 'route-codegen/RedirectServerSide'
  import {generateUrl,} from 'route-codegen'
  import {UrlPartsLogin,patternLogin,} from './patternLogin'
  const RedirectLogin: React.FunctionComponent<UrlPartsLogin & { fallback?: React.ReactNode }> = props => {
    const to = generateUrl(patternLogin, props.path, props.urlQuery);
    return <RedirectServerSide>{props.fallback}</RedirectServerSide>;
  };
  export default RedirectLogin`);
  });
});
