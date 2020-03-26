import generatePatternFile from './generatePatternFile';

describe('generatePatternFile', () => {
  it('should generate correctly if no dynamic path', () => {
    const [templateFile, interfaceResult] = generatePatternFile({
      routePattern: '/app/login',
      destinationDir: 'path/to/routes',
      routeName: 'Login',
    });

    expect(templateFile.filename).toBe('patternLogin');
    expect(templateFile.extension).toBe('.ts');
    expect(templateFile.destinationDir).toBe('path/to/routes');
    expect(templateFile.template).toContain("export const patternLogin = '/app/login'");
    expect(interfaceResult).toEqual({
      patternName: 'patternLogin',
      urlPartsInterfaceName: 'UrlPartsLogin',
      filename: 'patternLogin',
    });
  });

  it('should generate correctly for routes with dynamic path', () => {
    const [templateFile, interfaceResult] = generatePatternFile({
      routePattern: '/app/users/:id/:subview(profile|pictures)',
      destinationDir: 'path/to/routes',
      routeName: 'UserInfo',
    });

    expect(templateFile.filename).toBe('patternUserInfo');
    expect(templateFile.extension).toBe('.ts');
    expect(templateFile.destinationDir).toBe('path/to/routes');
    expect(templateFile.template).toContain(
      "export const patternUserInfo = '/app/users/:id/:subview(profile|pictures)'"
    );
    expect(templateFile.template).toContain(
      `export interface PathParamsUserInfo {id: string;subview:'profile'|'pictures';}`
    );
    expect(templateFile.template).toContain(`export interface UrlPartsUserInfo {
    path: PathParamsUserInfo;
    urlQuery?: Partial<Record<string, string>>;
  }`);
    expect(interfaceResult).toEqual({
      patternName: 'patternUserInfo',
      pathParamsInterfaceName: 'PathParamsUserInfo',
      urlPartsInterfaceName: 'UrlPartsUserInfo',
      filename: 'patternUserInfo',
    });
  });
});
