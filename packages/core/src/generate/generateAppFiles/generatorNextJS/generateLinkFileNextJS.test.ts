import generateLinkFileNextJS, { GenerateLinkFileNextJSParams } from "./generateLinkFileNextJS";

describe("generateLinkFileNextJS", () => {
  const defaultParams: GenerateLinkFileNextJSParams = {
    importGenerateUrl: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" },
    routeLinkOption: {
      importLink: {
        from: "src/NextJS/Link",
        defaultImport: "Link",
        namedImports: [{ name: "NextJSLinkProps" }],
      },
      hrefProp: "customHref",
      linkComponent: "Link",
      linkProps: "NextJSLinkProps",
      generateLinkComponent: true,
      generateUseParams: true,
      generateUseRedirect: true,
      mode: "loose",
    },
    routeName: "Login",
    patternNamedExports: {
      originName: "originLogin",
      filename: "patternLogin",
      patternName: "patternLogin",
      urlPartsInterfaceName: "UrlPartsLogin",
      patternNameNextJS: "patternNextJSLogin",
    },
    destinationDir: "path/to/routes",
  };

  describe("NextJS", () => {
    it("should generate correctly if no path params", () => {
      const templateFile = generateLinkFileNextJS({ ...defaultParams });

      expect(templateFile.filename).toBe("LinkLogin");
      expect(templateFile.extension).toBe(".tsx");
      expect(templateFile.destinationDir).toBe("path/to/routes");
      expect(templateFile.template).toContain(`import React from 'react'
  import Link, {NextJSLinkProps,} from 'src/NextJS/Link'
  import {UrlPartsLogin,patternNextJSLogin,} from './patternLogin'
  type LinkLoginProps = Omit<NextJSLinkProps, 'customHref'> & UrlPartsLogin
  const LinkLogin: React.FunctionComponent<LinkLoginProps> = props => {
    const { query = {}, ...rest } = props; const path = {};
    const pathname = patternNextJSLogin;
    const nextHref = {
      pathname: pathname,
      query: {
        ...path,
        ...query,
      },
    }
    return <Link {...rest} customHref={nextHref} />;
  }
  export default LinkLogin;`);
    });

    it("should generate correctly with path params", () => {
      const templateFile = generateLinkFileNextJS({
        ...defaultParams,
        patternNamedExports: {
          ...defaultParams.patternNamedExports,
          pathParamsInterfaceName: "PathParamsLogin",
          possiblePathParamsVariableName: "possiblePathParamsLogin",
        },
      });

      expect(templateFile.filename).toBe("LinkLogin");
      expect(templateFile.extension).toBe(".tsx");
      expect(templateFile.destinationDir).toBe("path/to/routes");
      expect(templateFile.template).toContain(`import React from 'react'
  import Link, {NextJSLinkProps,} from 'src/NextJS/Link'
  import {UrlPartsLogin,patternNextJSLogin,possiblePathParamsLogin,} from './patternLogin'
  type LinkLoginProps = Omit<NextJSLinkProps, 'customHref'> & UrlPartsLogin
  const LinkLogin: React.FunctionComponent<LinkLoginProps> = props => {
    const { path = {}, query = {}, ...rest } = props;
    const pathname = possiblePathParamsLogin.filter((key) => !(key in path)).reduce((prevPattern, suppliedParam) => prevPattern.replace(\`/[${"${suppliedParam"}}]\`, ""), patternNextJSLogin);
    const nextHref = {
      pathname: pathname,
      query: {
        ...path,
        ...query,
      },
    }
    return <Link {...rest} customHref={nextHref} />;
  }
  export default LinkLogin;`);
    });

    it("should generate correctly with named component import", () => {
      const templateFile = generateLinkFileNextJS({
        ...defaultParams,
        routeLinkOption: {
          importLink: {
            from: "src/common/Link",
            namedImports: [{ name: "CustomLinkProps" }, { name: "CustomLink", importAs: "Link" }],
          },
          linkComponent: "Link",
          linkProps: "CustomLinkProps",
          hrefProp: "to",
          generateLinkComponent: true,
          generateUseParams: true,
          generateUseRedirect: true,
          mode: "loose",
        },
      });

      expect(templateFile.filename).toBe("LinkLogin");
      expect(templateFile.extension).toBe(".tsx");
      expect(templateFile.destinationDir).toBe("path/to/routes");
      expect(templateFile.template).toContain(`import React from 'react'
  import {CustomLinkProps,CustomLink as Link,} from 'src/common/Link'
  import {UrlPartsLogin,patternNextJSLogin,} from './patternLogin'
  type LinkLoginProps = Omit<CustomLinkProps, 'to'> & UrlPartsLogin
  const LinkLogin: React.FunctionComponent<LinkLoginProps> = props => {
    const { query = {}, ...rest } = props; const path = {};
    const pathname = patternNextJSLogin;
    const nextHref = {
      pathname: pathname,
      query: {
        ...path,
        ...query,
      },
    }
    return <Link {...rest} to={nextHref} />;
  }
  export default LinkLogin;`);
    });

    it("should throw error if no patternNameNextJS", () => {
      expect(() =>
        generateLinkFileNextJS({
          ...defaultParams,
          routeLinkOption: {
            importLink: {
              from: "src/common/Link",
              namedImports: [{ name: "CustomLinkProps" }, { name: "CustomLink", importAs: "Link" }],
            },
            linkComponent: "Link",
            linkProps: "CustomLinkProps",
            hrefProp: "to",
            generateLinkComponent: true,
            generateUseParams: true,
            generateUseRedirect: true,
            mode: "loose",
          },
          patternNamedExports: {
            ...defaultParams.patternNamedExports,
            patternNameNextJS: undefined,
          },
        })
      ).toThrowError('[ERROR] Missing "patternNameNextJS". This is most likely a problem with route-codegen.');
    });
  });
});
