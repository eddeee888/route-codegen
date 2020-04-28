import generateUseParamsFileNextJS from "./generateUseParamsFileNextJS";

describe("generateUseParamsFileNextJS", () => {
  it("should generate correctly", () => {
    const templateFile = generateUseParamsFileNextJS({
      pathParamsFilename: "patternUser",
      pathParamsInterfaceName: "PathParamsNextJSUser",
      destinationDir: "path/to/routes",
      routeName: "User",
      routePattern: "/users/:id/:subview(profile|pictures)/:optional?/:optionalEnum(enum1|enum2)?",
    });

    expect(templateFile.filename).toBe("useParamsUser");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toContain(`import {PathParamsNextJSUser,} from './patternUser'
    import {useRouter,} from 'next/router'
    const useParamsUser = (): PathParamsNextJSUser => {
      const query = useRouter().query;
      return {id: query.id as string,subview: query.subview as string,optional: query.optional ? (query.optional as string) : undefined,optionalEnum: query.optionalEnum ? (query.optionalEnum as string) : undefined,};
    }
    export default useParamsUser;`);
  });
});
