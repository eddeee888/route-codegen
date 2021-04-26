import { printImport } from "./printImport";

describe("printImport", () => {
  it("should print default import", () => {
    const result = printImport({ from: "some-package", defaultImport: "somePackage" });
    expect(result).toBe("import somePackage from 'some-package'");
  });

  it("should print one named import", () => {
    const result = printImport({ from: "some-package", namedImports: [{ name: "namedImportOne" }] });
    expect(result).toBe("import {namedImportOne,} from 'some-package'");
  });

  it("should print one named import with alias", () => {
    const result = printImport({
      from: "some-package",
      namedImports: [{ name: "namedImportOne", importAs: "aliasOne" }],
    });
    expect(result).toBe("import {namedImportOne as aliasOne,} from 'some-package'");
  });

  it("should print multiple named imports", () => {
    const result = printImport({
      from: "some-package",
      namedImports: [{ name: "namedImportOne" }, { name: "namedImportTwo", importAs: "aliasTwo" }],
    });
    expect(result).toBe("import {namedImportOne,namedImportTwo as aliasTwo,} from 'some-package'");
  });

  it("should print default import and named imports", () => {
    const result = printImport({
      from: "some-package",
      defaultImport: "somePackage",
      namedImports: [{ name: "namedImportOne" }, { name: "namedImportTwo", importAs: "aliasTwo" }],
    });
    expect(result).toBe("import somePackage, {namedImportOne,namedImportTwo as aliasTwo,} from 'some-package'");
  });

  it("should throw error if no named import or default import", () => {
    expect(() =>
      printImport({
        from: "some-package",
      })
    ).toThrowError();
  });
});
