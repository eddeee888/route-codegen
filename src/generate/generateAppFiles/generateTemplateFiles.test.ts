import generateTemplateFiles, { GenerateTemplateFilesParams } from './generateTemplateFiles';
import { RoutingType } from '../config';

// Only test `destinationDir`, `filename` and `extension here` i.e. values needed to generate files.
// Templates should be unit tested in `generate**File.test.ts`
describe('generateTemplateFiles', () => {
  const params: GenerateTemplateFilesParams = {
    routeName: 'login',
    routePattern: '/login',
    routingType: RoutingType.Default,
    shouldGenerateLink: true,
    importGenerateUrl: {
      from: 'route-codegen',
      namedImports: [{ name: 'generateUrl' }],
    },
    destinationDir: 'path/to/routes',
    routeLinkOptions: {
      ReactRouterV5: {
        path: 'src/common/Link',
        hrefProp: 'to',
        linkComponent: 'Link',
        propsInterfaceName: 'CustomLinkProps',
        useRedirect: true,
        useParams: true,
      },
      Default: {
        hrefProp: 'href',
        linkComponent: 'a',
        path: '',
        propsInterfaceName: '',
        inlineLinkPropsTemplate: `type LinkProps = Omit<DefaultLinkProps, 'href'>;`,
      },
      NextJS: {
        path: 'src/NextJS/Link',
        linkComponent: 'Link',
        hrefProp: 'customHref',
        propsInterfaceName: 'NextJSLinkProps',
      },
    },
  };

  describe('Default', () => {
    it('should generate files', () => {
      const files = generateTemplateFiles({ ...params, routingType: RoutingType.Default });
      expect(files).toHaveLength(3);
      expect(files[0].filename).toEqual('patternLogin');
      expect(files[0].extension).toEqual('.ts');
      expect(files[0].destinationDir).toEqual('path/to/routes/login');
      expect(files[1].filename).toEqual('generateUrlLogin');
      expect(files[1].extension).toEqual('.ts');
      expect(files[1].destinationDir).toEqual('path/to/routes/login');
      expect(files[2].filename).toEqual('LinkLogin');
      expect(files[2].extension).toEqual('.tsx');
      expect(files[2].destinationDir).toEqual('path/to/routes/login');
    });

    it('should not generate Link if not needed', () => {
      const files = generateTemplateFiles({ ...params, routingType: RoutingType.Default, shouldGenerateLink: false });
      expect(files).toHaveLength(2);
      expect(files[0].filename).toEqual('patternLogin');
      expect(files[0].extension).toEqual('.ts');
      expect(files[0].destinationDir).toEqual('path/to/routes/login');
      expect(files[1].filename).toEqual('generateUrlLogin');
      expect(files[1].extension).toEqual('.ts');
      expect(files[1].destinationDir).toEqual('path/to/routes/login');
    });
  });

  describe('ReactRouterV5', () => {
    it('should generate files when no dynamic path params', () => {
      const files = generateTemplateFiles({ ...params, routingType: RoutingType.ReactRouterV5 });
      expect(files).toHaveLength(4);
      expect(files[0].filename).toEqual('patternLogin');
      expect(files[0].extension).toEqual('.ts');
      expect(files[0].destinationDir).toEqual('path/to/routes/login');
      expect(files[1].filename).toEqual('generateUrlLogin');
      expect(files[1].extension).toEqual('.ts');
      expect(files[1].destinationDir).toEqual('path/to/routes/login');
      expect(files[2].filename).toEqual('LinkLogin');
      expect(files[2].extension).toEqual('.tsx');
      expect(files[2].destinationDir).toEqual('path/to/routes/login');
      expect(files[3].filename).toEqual('useRedirectLogin');
      expect(files[3].extension).toEqual('.ts');
      expect(files[3].destinationDir).toEqual('path/to/routes/login');
    });

    it('should generate files with dynamic path params', () => {
      const files = generateTemplateFiles({
        ...params,
        routePattern: '/login/:id',
        routingType: RoutingType.ReactRouterV5,
      });
      expect(files).toHaveLength(5);
      expect(files[0].filename).toEqual('patternLogin');
      expect(files[0].extension).toEqual('.ts');
      expect(files[0].destinationDir).toEqual('path/to/routes/login');
      expect(files[1].filename).toEqual('generateUrlLogin');
      expect(files[1].extension).toEqual('.ts');
      expect(files[1].destinationDir).toEqual('path/to/routes/login');
      expect(files[2].filename).toEqual('LinkLogin');
      expect(files[2].extension).toEqual('.tsx');
      expect(files[2].destinationDir).toEqual('path/to/routes/login');
      expect(files[3].filename).toEqual('useParamsLogin');
      expect(files[3].extension).toEqual('.ts');
      expect(files[3].destinationDir).toEqual('path/to/routes/login');
      expect(files[4].filename).toEqual('useRedirectLogin');
      expect(files[4].extension).toEqual('.ts');
      expect(files[4].destinationDir).toEqual('path/to/routes/login');
    });

    it('should not generate Link if not needed', () => {
      const files = generateTemplateFiles({
        ...params,
        shouldGenerateLink: false,
        routePattern: '/login/:id',
        routingType: RoutingType.ReactRouterV5,
      });
      expect(files).toHaveLength(4);
      expect(files[0].filename).toEqual('patternLogin');
      expect(files[0].extension).toEqual('.ts');
      expect(files[0].destinationDir).toEqual('path/to/routes/login');
      expect(files[1].filename).toEqual('generateUrlLogin');
      expect(files[1].extension).toEqual('.ts');
      expect(files[1].destinationDir).toEqual('path/to/routes/login');
      expect(files[2].filename).toEqual('useParamsLogin');
      expect(files[2].extension).toEqual('.ts');
      expect(files[2].destinationDir).toEqual('path/to/routes/login');
      expect(files[3].filename).toEqual('useRedirectLogin');
      expect(files[3].extension).toEqual('.ts');
      expect(files[3].destinationDir).toEqual('path/to/routes/login');
    });
  });

  describe('NextJS', () => {
    it('should generate files', () => {
      const files = generateTemplateFiles({ ...params, routingType: RoutingType.NextJS });
      expect(files).toHaveLength(3);
      expect(files[0].filename).toEqual('patternLogin');
      expect(files[0].extension).toEqual('.ts');
      expect(files[0].destinationDir).toEqual('path/to/routes/login');
      expect(files[1].filename).toEqual('generateUrlLogin');
      expect(files[1].extension).toEqual('.ts');
      expect(files[1].destinationDir).toEqual('path/to/routes/login');
      expect(files[2].filename).toEqual('LinkLogin');
      expect(files[2].extension).toEqual('.tsx');
      expect(files[2].destinationDir).toEqual('path/to/routes/login');
    });

    it('should not generate Link if not needed', () => {
      const files = generateTemplateFiles({ ...params, routingType: RoutingType.NextJS, shouldGenerateLink: false });
      expect(files).toHaveLength(2);
      expect(files[0].filename).toEqual('patternLogin');
      expect(files[0].extension).toEqual('.ts');
      expect(files[0].destinationDir).toEqual('path/to/routes/login');
      expect(files[1].filename).toEqual('generateUrlLogin');
      expect(files[1].extension).toEqual('.ts');
      expect(files[1].destinationDir).toEqual('path/to/routes/login');
    });
  });
});
