import generateUseParamsFileNextJS from './generateUseParamsFileNextJS';

describe('generateUseParamsFileNextJS', () => {
  it('should generate correctly', () => {
    const templateFile = generateUseParamsFileNextJS({
      pathParamsFilename: 'patternUser',
      pathParamsInterfaceName: 'PathParamsNextJSUser',
      destinationDir: 'path/to/routes',
      routeName: 'User',
      keys: [
        { name: 'id', modifier: '', pattern: '', prefix: '', suffix: '' },
        { name: 'subview', modifier: '', pattern: '', prefix: '', suffix: '' },
      ],
    });

    expect(templateFile.filename).toBe('useParamsUser');
    expect(templateFile.extension).toBe('.ts');
    expect(templateFile.destinationDir).toBe('path/to/routes');
    expect(templateFile.template).toContain(`import {PathParamsNextJSUser,} from './patternUser'
    import {useRouter,} from 'next/router'
    const useParamsUser = (): PathParamsNextJSUser => {
      const query = useRouter().query;
      return {id: query.id as string,subview: query.subview as string,};
    }
    export default useParamsUser;`);
  });
});
