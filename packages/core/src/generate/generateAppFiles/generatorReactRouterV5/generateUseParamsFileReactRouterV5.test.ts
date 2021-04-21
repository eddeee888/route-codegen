import { generateUseParamsFileReactRouterV5 } from "./generateUseParamsFileReactRouterV5";

describe("generateUseParamsFileReactRouterV5", () => {
  it("should generate strict mode correctly", () => {
    const templateFile = generateUseParamsFileReactRouterV5({
      pathParamsFilename: "patternUser",
      pathParamsInterfaceName: "UserPathParams",
      patternName: "patternUser",
      destinationDir: "path/to/routes",
      routeName: "User",
      mode: "strict",
    });

    expect(templateFile.filename).toBe("useParamsUser");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import {UserPathParams,patternUser as pattern,} from './patternUser'
          import {useRouteMatch,} from 'react-router'
          export const useParamsUser = (): UserPathParams => {
            const { path, params } = useRouteMatch<UserPathParams>();
          if (path !== pattern) {
            const error = \`You are trying to use useParams for \\"\${pattern}\\" in \\"\${path}\\". Make sure you are using the right route link object!\`;
            throw new Error(error);
          }
          return params;
          }"
    `);
  });

  it("should generate loose mode correctly", () => {
    const templateFile = generateUseParamsFileReactRouterV5({
      pathParamsFilename: "patternUser",
      pathParamsInterfaceName: "UserPathParams",
      patternName: "patternUser",
      destinationDir: "path/to/routes",
      routeName: "User",
      mode: "loose",
    });

    expect(templateFile.filename).toBe("useParamsUser");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toMatchInlineSnapshot(`
      "import {UserPathParams,} from './patternUser'
          import {useRouteMatch,} from 'react-router'
          export const useParamsUser = (): UserPathParams => {
            return useRouteMatch<UserPathParams>().params;
          }"
    `);
  });
});
