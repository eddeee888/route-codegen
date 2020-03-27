import generateUseRedirectFile from './generateUseRedirectFile';

describe('generateUseRedirectFile', () => {
  it('should generate when there is no pathParams', () => {
    const templateFile = generateUseRedirectFile({
      routeName: 'Login',
      patternNamedExports: {
        filename: 'patternLogin',
        patternName: 'patternLogin',
        urlPartsInterfaceName: 'UrlPartsLogin',
      },
      destinationDir: 'path/to/routes',
      importGenerateUrl: {
        from: 'route-codegen',
        namedImports: [{ name: 'generateUrl' }],
      },
    });

    expect(templateFile.filename).toBe('useRedirectLogin');
    expect(templateFile.extension).toBe('.ts');
    expect(templateFile.destinationDir).toBe('path/to/routes');
    expect(templateFile.template).toContain(`const useRedirectLogin = ( urlParts: UrlPartsLogin ): (() => void) => {
    const history = useHistory();
    const to = generateUrl(patternLogin, {}, urlParts.urlQuery);
    return () => history.push(to);
  }`);
  });

  it('should generate when there is pathParams', () => {
    const templateFile = generateUseRedirectFile({
      routeName: 'UserInfo',
      patternNamedExports: {
        filename: 'patternUserInfo',
        patternName: 'patternUserInfo',
        urlPartsInterfaceName: 'UrlPartsUserInfo',
        pathParamsInterfaceName: 'PathParamsUserInfo',
      },
      destinationDir: 'path/to/routes',
      importGenerateUrl: {
        from: 'route-codegen',
        namedImports: [{ name: 'generateUrl' }],
      },
    });

    expect(templateFile.filename).toBe('useRedirectUserInfo');
    expect(templateFile.extension).toBe('.ts');
    expect(templateFile.destinationDir).toBe('path/to/routes');
    expect(templateFile.template)
      .toContain(`const useRedirectUserInfo = ( urlParts: UrlPartsUserInfo ): (() => void) => {
    const history = useHistory();
    const to = generateUrl(patternUserInfo, urlParts.path, urlParts.urlQuery);
    return () => history.push(to);
  }`);
  });
});
