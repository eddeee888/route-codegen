import generateRoutePatternFile from './generateRoutePatternFile';

describe('generateRoutePatternFile', () => {
  it('should generate correctly if no dynamic path', () => {
    const [templateFile, interfaceResult] = generateRoutePatternFile({
      routePattern: '/app/login',
      destinationDir: 'path/to/routes',
      routeName: 'Login',
    });

    expect(templateFile.filename).toBe('patternToLogin');
    expect(templateFile.extension).toBe('.ts');
    expect(templateFile.destinationDir).toBe('path/to/routes');
    expect(templateFile.template).toContain("export const patternToLogin = '/app/login'");
    expect(interfaceResult).toEqual({
      pathPatternName: 'patternToLogin',
      filename: 'patternToLogin',
    });
  });

  it('should generate correctly for routes with dynamic path', () => {
    const [templateFile, interfaceResult] = generateRoutePatternFile({
      routePattern: '/app/users/:id/:subview(profile|pictures)',
      destinationDir: 'path/to/routes',
      routeName: 'UserInfo',
    });

    expect(templateFile.filename).toBe('patternToUserInfo');
    expect(templateFile.extension).toBe('.ts');
    expect(templateFile.destinationDir).toBe('path/to/routes');
    expect(templateFile.template).toContain(
      "export const patternToUserInfo = '/app/users/:id/:subview(profile|pictures)'"
    );
    expect(templateFile.template).toContain(
      `export interface UserInfoPathParams {id: string;subview:'profile'|'pictures';}`
    );
    expect(interfaceResult).toEqual({
      pathPatternName: 'patternToUserInfo',
      pathParamsInterfaceName: 'UserInfoPathParams',
      filename: 'patternToUserInfo',
    });
  });
});
