import generateRoutePatternFile from './generateRoutePatternFile';

describe('generateRoutePatternFile', () => {
  it('should generate correctly if no dynamic path', () => {
    const [templateFile, interfaceResult] = generateRoutePatternFile({
      routePattern: '/app/login',
      destinationDir: 'path/to/routes',
      routeName: 'Login',
    });

    expect(templateFile.filename).toBe('patternLogin');
    expect(templateFile.extension).toBe('.ts');
    expect(templateFile.destinationDir).toBe('path/to/routes');
    expect(templateFile.template).toContain("export const patternLogin = '/app/login'");
    expect(interfaceResult).toEqual({
      pathPatternName: 'patternLogin',
      urlPartsInterfaceName: 'urlPartsLogin',
      filename: 'patternLogin',
    });
  });

  it('should generate correctly for routes with dynamic path', () => {
    const [templateFile, interfaceResult] = generateRoutePatternFile({
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
      `export interface pathParamsUserInfo {id: string;subview:'profile'|'pictures';}`
    );
    expect(templateFile.template).toContain(`export interface urlPartsUserInfo {
    path: pathParamsUserInfo;
    urlQuery?: Partial<Record<string, string>>;
  }`);
    expect(interfaceResult).toEqual({
      pathPatternName: 'patternUserInfo',
      pathParamsInterfaceName: 'pathParamsUserInfo',
      urlPartsInterfaceName: 'urlPartsUserInfo',
      filename: 'patternUserInfo',
    });
  });
});
