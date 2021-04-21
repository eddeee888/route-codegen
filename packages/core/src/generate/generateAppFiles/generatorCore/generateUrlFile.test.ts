import { generateUrlFile } from "./generateUrlFile";

describe("generateUseParamsFile", () => {
  it("should generate correctly if no path params", () => {
    const templateFile = generateUrlFile({
      importGenerateUrl: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" },
      patternNamedExports: {
        filename: "patternUser",
        patternName: "patternUser",
        urlPartsInterfaceName: "UrlPartsUser",
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
        import {patternUser,UrlPartsUser,originUser,} from './patternUser'
        export const generateUrlUser = ( urlParts?: UrlPartsUser ): string => generateUrl({pattern: patternUser, path: {}, query: urlParts?.query, origin: urlParts?.origin ?? originUser});"
    `);
  });

  it("should generate correctly if has path params", () => {
    const templateFile = generateUrlFile({
      importGenerateUrl: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" },
      patternNamedExports: {
        filename: "patternUser",
        patternName: "patternUser",
        urlPartsInterfaceName: "UrlPartsUser",
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
        import {patternUser,UrlPartsUser,originUser,} from './patternUser'
        export const generateUrlUser = ( urlParts: UrlPartsUser ): string => generateUrl({pattern: patternUser, path: urlParts.path, query: urlParts?.query, origin: urlParts?.origin ?? originUser});"
    `);
  });
});
