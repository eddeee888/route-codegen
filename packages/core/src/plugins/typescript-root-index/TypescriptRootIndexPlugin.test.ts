import TypescriptRootIndexPlugin from "./TypescriptRootIndexPlugin";

describe("TypescriptRootIndexPlugin", () => {
  it("returns null if no files", () => {
    const result = new TypescriptRootIndexPlugin({
      destinationDir: "apps/",
      files: [],
    }).generate();
    expect(result).toBeNull();
  });

  it("returns index template correctly", () => {
    const result = new TypescriptRootIndexPlugin({
      destinationDir: "apps/",
      files: [
        {
          destinationDir: "apps/",
          extension: ".tsx",
          filename: "TestComponent",
          hasDefaultExport: true,
          hasNamedExports: true,
          template: "",
          routeName: "test",
        },
        {
          destinationDir: "apps/",
          extension: ".ts",
          filename: "useParams",
          hasDefaultExport: true,
          hasNamedExports: false,
          template: "",
          routeName: "test",
        },
        {
          destinationDir: "apps/",
          extension: ".ts",
          filename: "pattern",
          hasDefaultExport: false,
          hasNamedExports: true,
          template: "",
          routeName: "user",
        },
      ],
    }).generate();

    if (!result) {
      throw new Error("Null result");
    }

    expect(result.destinationDir).toBe("apps/");
    expect(result.filename).toBe("index");
    expect(result.extension).toBe(".ts");
    expect(result.hasDefaultExport).toBe(false);
    expect(result.hasNamedExports).toBe(true);
    expect(result.routeName).toBe("");
    expect(result.template).toMatchInlineSnapshot(
      `"export { default as TestComponent } from \\"./test/TestComponent\\";export * from \\"./test/TestComponent\\";export { default as useParams } from \\"./test/useParams\\";export * from \\"./user/pattern\\";"`
    );
  });
});
