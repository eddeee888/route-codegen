import generateAppFiles from './generateAppFiles';
import { AppConfig } from '../config';

// Only test `destinationDir`, `filename` and `extension here` i.e. values needed to generate files.
// Templates should be unit tested in `generate**File.test.ts`
describe('generateAppFiles', () => {
  const appConfig: AppConfig = {
    routes: {
      login: '/login',
      user: '/user/:id',
    },
    destinationDir: 'path/to/routes',
    generateLink: true,
  };

  describe('general config', () => {
    it('should not generate any file if no destinationDir', () => {
      const files = generateAppFiles({ ...appConfig, destinationDir: undefined });
      expect(files).toHaveLength(0);
    });
  });

  describe('Default', () => {
    it('should generate files', () => {
      const files = generateAppFiles({ ...appConfig, routingType: 'Default' });

      expect(files).toHaveLength(6);
      expect(files[0].destinationDir).toEqual('path/to/routes/login');
      expect(files[0].filename).toEqual('patternLogin');
      expect(files[0].extension).toEqual('.ts');
      expect(files[1].destinationDir).toEqual('path/to/routes/login');
      expect(files[1].filename).toEqual('generateUrlLogin');
      expect(files[1].extension).toEqual('.ts');
      expect(files[2].destinationDir).toEqual('path/to/routes/login');
      expect(files[2].filename).toEqual('LinkLogin');
      expect(files[2].extension).toEqual('.tsx');

      expect(files[3].destinationDir).toEqual('path/to/routes/user');
      expect(files[3].filename).toEqual('patternUser');
      expect(files[3].extension).toEqual('.ts');
      expect(files[4].destinationDir).toEqual('path/to/routes/user');
      expect(files[4].filename).toEqual('generateUrlUser');
      expect(files[4].extension).toEqual('.ts');
      expect(files[5].destinationDir).toEqual('path/to/routes/user');
      expect(files[5].filename).toEqual('LinkUser');
      expect(files[5].extension).toEqual('.tsx');
    });
  });

  describe('NextJS', () => {
    it('should generate files', () => {
      const files = generateAppFiles({ ...appConfig, routingType: 'NextJS' });

      expect(files).toHaveLength(6);
      expect(files[0].destinationDir).toEqual('path/to/routes/login');
      expect(files[0].filename).toEqual('patternLogin');
      expect(files[0].extension).toEqual('.ts');
      expect(files[1].destinationDir).toEqual('path/to/routes/login');
      expect(files[1].filename).toEqual('generateUrlLogin');
      expect(files[1].extension).toEqual('.ts');
      expect(files[2].destinationDir).toEqual('path/to/routes/login');
      expect(files[2].filename).toEqual('LinkLogin');
      expect(files[2].extension).toEqual('.tsx');

      expect(files[3].destinationDir).toEqual('path/to/routes/user');
      expect(files[3].filename).toEqual('patternUser');
      expect(files[3].extension).toEqual('.ts');
      expect(files[4].destinationDir).toEqual('path/to/routes/user');
      expect(files[4].filename).toEqual('generateUrlUser');
      expect(files[4].extension).toEqual('.ts');
      expect(files[5].destinationDir).toEqual('path/to/routes/user');
      expect(files[5].filename).toEqual('LinkUser');
      expect(files[5].extension).toEqual('.tsx');
    });
  });

  describe('ReactRouterV5', () => {
    it('should generate files', () => {
      const files = generateAppFiles({ ...appConfig, routingType: 'ReactRouterV5' });

      expect(files).toHaveLength(9);
      expect(files[0].destinationDir).toEqual('path/to/routes/login');
      expect(files[0].filename).toEqual('patternLogin');
      expect(files[0].extension).toEqual('.ts');
      expect(files[1].destinationDir).toEqual('path/to/routes/login');
      expect(files[1].filename).toEqual('generateUrlLogin');
      expect(files[1].extension).toEqual('.ts');
      expect(files[2].destinationDir).toEqual('path/to/routes/login');
      expect(files[2].filename).toEqual('LinkLogin');
      expect(files[2].extension).toEqual('.tsx');
      expect(files[3].destinationDir).toEqual('path/to/routes/login');
      expect(files[3].filename).toEqual('useRedirectLogin');
      expect(files[3].extension).toEqual('.ts');

      expect(files[4].destinationDir).toEqual('path/to/routes/user');
      expect(files[4].filename).toEqual('patternUser');
      expect(files[4].extension).toEqual('.ts');
      expect(files[5].destinationDir).toEqual('path/to/routes/user');
      expect(files[5].filename).toEqual('generateUrlUser');
      expect(files[5].extension).toEqual('.ts');
      expect(files[6].destinationDir).toEqual('path/to/routes/user');
      expect(files[6].filename).toEqual('LinkUser');
      expect(files[6].extension).toEqual('.tsx');
      expect(files[7].destinationDir).toEqual('path/to/routes/user');
      expect(files[7].filename).toEqual('useParamsUser');
      expect(files[7].extension).toEqual('.ts');
      expect(files[8].destinationDir).toEqual('path/to/routes/user');
      expect(files[8].filename).toEqual('useRedirectUser');
      expect(files[8].extension).toEqual('.ts');
    });

    it('should not generate useParams if not needed', () => {
      const files = generateAppFiles({
        ...appConfig,
        routingType: 'ReactRouterV5',
        reactRouterV5LinkOptions: { useParams: false },
      });

      expect(files).toHaveLength(8);
      expect(files[0].destinationDir).toEqual('path/to/routes/login');
      expect(files[0].filename).toEqual('patternLogin');
      expect(files[0].extension).toEqual('.ts');
      expect(files[1].destinationDir).toEqual('path/to/routes/login');
      expect(files[1].filename).toEqual('generateUrlLogin');
      expect(files[1].extension).toEqual('.ts');
      expect(files[2].destinationDir).toEqual('path/to/routes/login');
      expect(files[2].filename).toEqual('LinkLogin');
      expect(files[2].extension).toEqual('.tsx');
      expect(files[3].destinationDir).toEqual('path/to/routes/login');
      expect(files[3].filename).toEqual('useRedirectLogin');
      expect(files[3].extension).toEqual('.ts');

      expect(files[4].destinationDir).toEqual('path/to/routes/user');
      expect(files[4].filename).toEqual('patternUser');
      expect(files[4].extension).toEqual('.ts');
      expect(files[5].destinationDir).toEqual('path/to/routes/user');
      expect(files[5].filename).toEqual('generateUrlUser');
      expect(files[5].extension).toEqual('.ts');
      expect(files[6].destinationDir).toEqual('path/to/routes/user');
      expect(files[6].filename).toEqual('LinkUser');
      expect(files[6].extension).toEqual('.tsx');
      expect(files[7].destinationDir).toEqual('path/to/routes/user');
      expect(files[7].filename).toEqual('useRedirectUser');
      expect(files[7].extension).toEqual('.ts');
    });

    it('should not generate useRedirect if not needed', () => {
      const files = generateAppFiles({
        ...appConfig,
        routingType: 'ReactRouterV5',
        reactRouterV5LinkOptions: { useRedirect: false },
      });

      expect(files).toHaveLength(7);
      expect(files[0].destinationDir).toEqual('path/to/routes/login');
      expect(files[0].filename).toEqual('patternLogin');
      expect(files[0].extension).toEqual('.ts');
      expect(files[1].destinationDir).toEqual('path/to/routes/login');
      expect(files[1].filename).toEqual('generateUrlLogin');
      expect(files[1].extension).toEqual('.ts');
      expect(files[2].destinationDir).toEqual('path/to/routes/login');
      expect(files[2].filename).toEqual('LinkLogin');
      expect(files[2].extension).toEqual('.tsx');

      expect(files[3].destinationDir).toEqual('path/to/routes/user');
      expect(files[3].filename).toEqual('patternUser');
      expect(files[3].extension).toEqual('.ts');
      expect(files[4].destinationDir).toEqual('path/to/routes/user');
      expect(files[4].filename).toEqual('generateUrlUser');
      expect(files[4].extension).toEqual('.ts');
      expect(files[5].destinationDir).toEqual('path/to/routes/user');
      expect(files[5].filename).toEqual('LinkUser');
      expect(files[5].extension).toEqual('.tsx');
      expect(files[6].destinationDir).toEqual('path/to/routes/user');
      expect(files[6].filename).toEqual('useParamsUser');
      expect(files[6].extension).toEqual('.ts');
    });
  });
});
