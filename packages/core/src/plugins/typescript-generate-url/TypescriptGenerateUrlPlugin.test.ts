import { GeneralPluginBaseConfig } from "../../utils";
import { plugin } from "./TypescriptGenerateUrlPlugin";

describe("TypescriptGenerateUrlPlugin - generateUrl file", () => {
  const defaultParams: GeneralPluginBaseConfig = {
    appName: "nextjs-app",
    patternNamedExports: {
      filename: "patternUser",
      patternName: "patternUser",
      urlParamsInterfaceName: "UrlParamsUser",
      originName: "originUser",
    },
    destinationDir: "path/to/routes",
    routeName: "User",
    routePattern: "/user",
    topLevelGenerateOptions: {
      generateUseRedirect: false,
      generateUseParams: false,
      generateRedirectComponent: false,
      generateLinkComponent: false,
    },
    routeLinkOptions: {
      importCustomLink: {
        from: "src/NextJS/Link",
        componentDefaultImport: true,
        propsNamedImport: "NextJSLinkProps",
        hrefProp: "customHref",
      },
      generate: {
        linkComponent: true,
        useParams: false,
        useRedirect: false,
      },
      mode: "loose",
    },
    importGenerateUrl: { namedImports: [{ name: "generateUrl" }], from: "route-codegen" },
    importRedirectServerSide: { namedImports: [{ name: "RedirectServerSide" }], from: "@route-codegen/react" },
  };

  it("should generate correctly if no path params", () => {
    const files = plugin.generate({ ...defaultParams });

    expect(files).toHaveLength(1);

    const [templateFile] = files;

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
    const files = plugin.generate({
      ...defaultParams,
      patternNamedExports: { ...defaultParams.patternNamedExports, pathParamsInterfaceName: "PathParamsUser" },
    });

    expect(files).toHaveLength(1);

    const [templateFile] = files;

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
