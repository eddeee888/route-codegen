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
    expect(templateFile.template).toContain("const pattern = '/app/login'");
    expect(templateFile.template).toContain('export default pattern;');
    expect(interfaceResult).toBeUndefined();
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
    expect(templateFile.template).toContain("const pattern = '/app/users/:id/:subview(profile|pictures)'");
    expect(templateFile.template).toContain(
      `export interface UserInfoPathParams {id: string;subview:'profile'|'pictures';}`
    );
    expect(templateFile.template).toContain('export default pattern;');
    expect(interfaceResult).toEqual({
      importLine: "import  {UserInfoPathParams,} from './patternToUserInfo'",
      interfaceName: 'UserInfoPathParams',
    });
  });
});
