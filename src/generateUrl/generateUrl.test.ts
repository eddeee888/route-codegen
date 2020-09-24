import generateUrl from "./generateUrl";

describe("generateUrl", () => {
  describe("no path or query string", () => {
    it("should generate URL with no dynamic path params or query string", () => {
      const result = generateUrl("/app/login", {});
      expect(result).toBe("/app/login");
    });
  });

  describe("path - strings", () => {
    it("should generate URL with required path param", () => {
      const result = generateUrl("/app/users/:id", { id: "onehundo" });
      expect(result).toBe("/app/users/onehundo");
    });

    it("should throw error if path param is required but not in path object", () => {
      expect(() => generateUrl("/app/users/:id", {})).toThrowError('Expected "id" to be a string');
      expect(() => generateUrl("/app/users/:id", { name: "Hundo" })).toThrowError('Expected "id" to be a string');
    });

    it("should generate URL if path param is not required and not in path object", () => {
      const result = generateUrl("/app/users/:id?", {});
      expect(result).toBe("/app/users");
    });

    it("should generate URL if path param is not required but path is in path object", () => {
      const result = generateUrl("/app/users/:id?", { id: "onehundo" });
      expect(result).toBe("/app/users/onehundo");
    });

    it("should generate URL with required path param", () => {
      const result = generateUrl("/app/users/:id", { id: "onehundo" });
      expect(result).toBe("/app/users/onehundo");
    });

    it("should throw error if path param is required but not in path object", () => {
      expect(() => generateUrl("/app/users/:id", {})).toThrowError('Expected "id" to be a string');
      expect(() => generateUrl("/app/users/:id", { name: "Hundo" })).toThrowError('Expected "id" to be a string');
    });

    it("should generate URL if path param is not required and not in path object", () => {
      const result = generateUrl("/app/users/:id?", {});
      expect(result).toBe("/app/users");
    });

    it("should generate URL if path param is not required but path is in path object", () => {
      const result = generateUrl("/app/users/:id?", { id: "onehundo" });
      expect(result).toBe("/app/users/onehundo");
    });
  });

  describe("paths - enums", () => {
    it("should generate URL with required enum path param", () => {
      const result = generateUrl("/app/users/:subview(profile|pictures)", { subview: "profile" });
      expect(result).toBe("/app/users/profile");
    });

    it("should throw error with required enum path param and path is not in path object", () => {
      expect(() => generateUrl("/app/users/:subview(profile|pictures)", { house: "profile" })).toThrowError(
        'Expected "subview" to be a string'
      );
    });

    it("should throw error with required enum path param and path is not part of enums", () => {
      expect(() => generateUrl("/app/users/:subview(profile|pictures)", { subview: "dog" })).toThrowError(
        'Expected "subview" to match "profile|pictures", but got "dog"'
      );
    });

    it("should generate URL with optional enum path param and path not in path object", () => {
      const result = generateUrl("/app/users/:subview(profile|pictures)?", {});
      expect(result).toBe("/app/users");
    });

    it("should generate URL with optional enum path param and path in path object", () => {
      const result = generateUrl("/app/users/:subview(profile|pictures)?", { subview: "profile" });
      expect(result).toBe("/app/users/profile");
    });

    it("should generate URL with optional enum path param and path is not in path object", () => {
      const result = generateUrl("/app/users/:subview(profile|pictures)?", { house: "profile" });
      expect(result).toBe("/app/users");
    });

    it("should throw error with optional enum path param and path is not part of enums", () => {
      expect(() => generateUrl("/app/users/:subview(profile|pictures)?", { subview: "dog" })).toThrowError(
        'Expected "subview" to match "profile|pictures", but got "dog"'
      );
    });
  });

  describe("query strings", () => {
    it("should generate one query string correctly", () => {
      const result = generateUrl("/app/users/:id", { id: "oneHundo" }, { from: "homepage" });
      expect(result).toBe("/app/users/oneHundo?from=homepage");
    });

    it("should generate multiple query strings correctly", () => {
      const result = generateUrl("/app/users/:id", { id: "oneHundo" }, { from: "homepage", redirect: "/login" });
      expect(result).toBe("/app/users/oneHundo?from=homepage&redirect=/login");
    });

    it("should generate 1 undefined query string correctly", () => {
      const result = generateUrl("/app/users/:id", { id: "oneHundo" }, { from: undefined });
      expect(result).toBe("/app/users/oneHundo");
    });

    it("should generate more than 1 undefined query string correctly", () => {
      const result = generateUrl("/app/users/:id", { id: "oneHundo" }, { from: undefined, redirect: undefined });
      expect(result).toBe("/app/users/oneHundo");
    });

    it("should generate mixed undefined and string correctly", () => {
      const result = generateUrl("/app/users/:id", { id: "oneHundo" }, { from: "homepage", redirect: undefined, to: "test" });
      expect(result).toBe("/app/users/oneHundo?from=homepage&to=test");
    });
  });

  describe("with prefix", () => {
    it("should generate url with prefix", () => {
      const result = generateUrl("/app/users/:id", { id: "oneHundo" }, { from: "homepage" }, "https://test.domain");
      expect(result).toBe("https://test.domain/app/users/oneHundo?from=homepage");
    });
  });
});
