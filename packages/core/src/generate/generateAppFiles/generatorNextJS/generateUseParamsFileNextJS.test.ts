import generateUseParamsFileNextJS from "./generateUseParamsFileNextJS";

describe("generateUseParamsFileNextJS", () => {
  it("should generate correctly for loose mode", () => {
    const templateFile = generateUseParamsFileNextJS({
      pathParamsFilename: "patternUser",
      pathParamsInterfaceName: "PathParamsNextJSUser",
      destinationDir: "path/to/routes",
      routeName: "User",
      routePattern: "/users/:id/:subview(profile|pictures)/:optional?/:optionalEnum(enum1|enum2)?",
      mode: "loose",
    });

    expect(templateFile.filename).toBe("useParamsUser");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toContain(`import {PathParamsNextJSUser,} from './patternUser'
    import {useRouter,} from 'next/router'
    const useParamsUser = (): PathParamsNextJSUser => {
      const query = useRouter().query;
      return {id: query.id as PathParamsNextJSUser["id"],subview: query.subview as PathParamsNextJSUser["subview"],optional: query.optional ? (query.optional as PathParamsNextJSUser["optional"]) : undefined,optionalEnum: query.optionalEnum ? (query.optionalEnum as PathParamsNextJSUser["optionalEnum"]) : undefined,};
    }
    export default useParamsUser;`);
  });

  it("should generate correctly for strict mode", () => {
    const templateFile = generateUseParamsFileNextJS({
      pathParamsFilename: "patternUser",
      pathParamsInterfaceName: "PathParamsNextJSUser",
      destinationDir: "path/to/routes",
      routeName: "User",
      routePattern: "/users/:id/:subview(profile|pictures)/:optional?/:optionalEnum(enum1|enum2)?",
      mode: "strict",
    });

    expect(templateFile.filename).toBe("useParamsUser");
    expect(templateFile.extension).toBe(".ts");
    expect(templateFile.destinationDir).toBe("path/to/routes");
    expect(templateFile.template).toContain(`import {PathParamsNextJSUser,} from './patternUser'
    import {useRouter,} from 'next/router'
    const useParamsUser = (): PathParamsNextJSUser => {
      const query = useRouter().query;
      return {id: query.id as PathParamsNextJSUser[\"id\"],subview: (() => {
            const subviewPossibleValues = [\"profile\",\"pictures\",]
            if(subviewPossibleValues.findIndex((v) => v === query.subview) === -1){
            throw new Error("Unable to match 'subview' with expected enums");
          }
            return query.subview as PathParamsNextJSUser[\"subview\"]
          })(),optional: query.optional ? (query.optional as PathParamsNextJSUser[\"optional\"]) : undefined,optionalEnum: (() => {
            const optionalEnumPossibleValues = [\"enum1\",\"enum2\",undefined,]
            if(optionalEnumPossibleValues.findIndex((v) => v === query.optionalEnum) === -1){
            throw new Error("Unable to match 'optionalEnum' with expected enums");
          }
            return query.optionalEnum as PathParamsNextJSUser[\"optionalEnum\"]
          })(),};
    }
    export default useParamsUser;`);
  });
});
