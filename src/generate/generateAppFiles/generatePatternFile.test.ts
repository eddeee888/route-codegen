import generatePatternFile from './generatePatternFile';
import { RoutingType } from '../config';

describe('generatePatternFile', () => {
  describe('Default and ReactRouterV5', () => {
    it('should generate correctly if no dynamic path', () => {
      const [templateFile, interfaceResult] = generatePatternFile({
        appName: 'testApp',
        routePattern: '/app/login',
        destinationDir: 'path/to/routes',
        routeName: 'Login',
        routingType: RoutingType.Default,
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
        appName: 'testApp',
        routePattern: '/app/users/:id/:subview(profile|pictures)',
        destinationDir: 'path/to/routes',
        routeName: 'UserInfo',
        routingType: RoutingType.Default,
      });

      expect(templateFile.filename).toBe('patternUserInfo');
      expect(templateFile.extension).toBe('.ts');
      expect(templateFile.destinationDir).toBe('path/to/routes');
      expect(templateFile.template).toContain(
        `export const patternUserInfo = '/app/users/:id/:subview(profile|pictures)'
  
  export interface PathParamsUserInfo {id: string;subview:'profile'|'pictures';}
  export interface UrlPartsUserInfo {
    path: PathParamsUserInfo;
    urlQuery?: Record<string, string>;
  }`
      );
      expect(interfaceResult).toEqual({
        patternName: 'patternUserInfo',
        pathParamsInterfaceName: 'PathParamsUserInfo',
        urlPartsInterfaceName: 'UrlPartsUserInfo',
        filename: 'patternUserInfo',
      });
    });
  });

  describe('NextJS', () => {
    it('should generate template correctly with nextJS pattern', () => {
      const [templateFile, interfaceResult] = generatePatternFile({
        appName: 'testApp',
        routePattern: '/app/users/:id/:subview(profile|pictures)',
        destinationDir: 'path/to/routes',
        routeName: 'UserInfo',
        routingType: RoutingType.NextJS,
      });

      expect(templateFile.filename).toBe('patternUserInfo');
      expect(templateFile.extension).toBe('.ts');
      expect(templateFile.destinationDir).toBe('path/to/routes');
      expect(templateFile.template)
        .toContain(`export const patternUserInfo = '/app/users/:id/:subview(profile|pictures)'
  export const patternNextJSUserInfo = '/app/users/[id]/[subview]'
  export interface PathParamsUserInfo {id: string;subview:'profile'|'pictures';}
  export interface UrlPartsUserInfo {
    path: PathParamsUserInfo;
    urlQuery?: Record<string, string>;
  }`);
      expect(interfaceResult).toEqual({
        patternName: 'patternUserInfo',
        patternNameNextJS: 'patternNextJSUserInfo',
        pathParamsInterfaceName: 'PathParamsUserInfo',
        urlPartsInterfaceName: 'UrlPartsUserInfo',
        filename: 'patternUserInfo',
      });
    });
  });
});
