import generateRedirectFileReactRouterV5, {
  GenerateRedirectFileReactRouterV5Params,
} from './generateRedirectFileReactRouterV5';

describe('generateRedirectFileReactRouterV5', () => {
  const defaultParams: GenerateRedirectFileReactRouterV5Params = {
    importGenerateUrl: { namedImports: [{ name: 'generateUrl' }], from: 'route-codegen' },
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
    const templateFile = generateRedirectFileReactRouterV5({ ...defaultParams });

    expect(templateFile.filename).toBe('RedirectLogin');
    expect(templateFile.extension).toBe('.tsx');
    expect(templateFile.destinationDir).toBe('path/to/routes');
    expect(templateFile.template).toContain(`import React from 'react'
  import {generateUrl,} from 'route-codegen'
  import {Redirect,} from 'react-router'
  import {UrlPartsLogin,patternLogin,} from './patternLogin'
  const RedirectLogin: React.FunctionComponent<UrlPartsLogin & { fallback?: React.ReactNode }> = props => {
    const to = generateUrl(patternLogin, {}, props.urlQuery);
    return (
      <>
        <Redirect to={to} />
        {props.fallback}
      </>
    );
  };
  export default RedirectLogin`);
  });

  it('should generate correctly with path params', () => {
    const templateFile = generateRedirectFileReactRouterV5({
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
  import {generateUrl,} from 'route-codegen'
  import {Redirect,} from 'react-router'
  import {UrlPartsLogin,patternLogin,} from './patternLogin'
  const RedirectLogin: React.FunctionComponent<UrlPartsLogin & { fallback?: React.ReactNode }> = props => {
    const to = generateUrl(patternLogin, props.path, props.urlQuery);
    return (
      <>
        <Redirect to={to} />
        {props.fallback}
      </>
    );
  };
  export default RedirectLogin`);
  });
});
