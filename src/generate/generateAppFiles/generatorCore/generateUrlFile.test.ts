import generateUrlFile from "./generateUrlFile";

describe("generateUseParamsFile", () => {
  it("should generate correctly if no path params", () => {
    const templateFile = generateUrlFile({
      importGenerateUrl: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" },
      patternNamedExports: {
        filename: "patternUser",
        patternName: "patternUser",
        urlPartsInterfaceName: "UrlPartsUser",
      },
      destinationDir: "path/to/routes",
      routeName: "User",
    });

    expect(templateFile.filename).toBe("generateUrlUser");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toContain(`import {generateUrl,} from 'route-codegen'
  import {patternUser,UrlPartsUser,} from './patternUser'
  const generateUrlUser = ( urlParts?: UrlPartsUser ): string => generateUrl(patternUser, {}, urlParts?.urlQuery);
  export default generateUrlUser;`);
  });

  it("should generate correctly if has path params", () => {
    const templateFile = generateUrlFile({
      importGenerateUrl: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" },
      patternNamedExports: {
        filename: "patternUser",
        patternName: "patternUser",
        urlPartsInterfaceName: "UrlPartsUser",
        pathParamsInterfaceName: "PathParamsUser",
      },
      destinationDir: "path/to/routes",
      routeName: "User",
    });

    expect(templateFile.filename).toBe("generateUrlUser");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toContain(`import {generateUrl,} from 'route-codegen'
  import {patternUser,UrlPartsUser,} from './patternUser'
  const generateUrlUser = ( urlParts: UrlPartsUser ): string => generateUrl(patternUser, urlParts.path, urlParts?.urlQuery);
  export default generateUrlUser;`);
  });
});
