import { generateUrlFile } from "./generateUrlFile";

describe("generateUseParamsFile", () => {
  it("should generate correctly if no path params", () => {
    const templateFile = generateUrlFile({
      importGenerateUrl: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" },
      patternNamedExports: {
        filename: "patternUser",
        patternName: "patternUser",
        urlParamsInterfaceName: "UrlParamsUser",
        originName: "originUser",
      },
      destinationDir: "path/to/routes",
      routeName: "User",
    });

    expect(templateFile.filename).toBe("generateUrlUser");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import {generateUrl,} from 'route-codegen'
        import {patternUser,UrlParamsUser,originUser,} from './patternUser'
        export const generateUrlUser = ( urlParams?: UrlParamsUser ): string => generateUrl(patternUser, { path: {}, query: urlParams?.query, origin: urlParams?.origin ?? originUser});"
    `);
  });

  it("should generate correctly if has path params", () => {
    const templateFile = generateUrlFile({
      importGenerateUrl: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" },
      patternNamedExports: {
        filename: "patternUser",
        patternName: "patternUser",
        urlParamsInterfaceName: "UrlParamsUser",
        pathParamsInterfaceName: "PathParamsUser",
        originName: "originUser",
      },
      destinationDir: "path/to/routes",
      routeName: "User",
    });

    expect(templateFile.filename).toBe("generateUrlUser");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import {generateUrl,} from 'route-codegen'
        import {patternUser,UrlParamsUser,originUser,} from './patternUser'
        export const generateUrlUser = ( urlParams: UrlParamsUser ): string => generateUrl(patternUser, { path: urlParams.path, query: urlParams?.query, origin: urlParams?.origin ?? originUser});"
    `);
  });
});
