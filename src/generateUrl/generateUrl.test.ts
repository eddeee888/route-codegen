import generateUrl from './generateUrl';

describe('generateUrl', () => {
  it('should generate URL with no dynamic path or query string', () => {
    const result = generateUrl('/app/login', {});

    expect(result).toBe('/app/login');
  });
});
