import { TemplateFile } from "../../types";
import { printImport, getKeysFromRoutePattern } from "../../utils";

export interface GenerateUseParamsFileNextJSParams {
  routeName: string;
  routePattern: string;
  destinationDir: string;
  pathParamsInterfaceName: string;
  pathParamsFilename: string;
}

// NextJS useRouter simply returns all dynamic params as strings
const generateUseParamsFileNextJS = (params: GenerateUseParamsFileNextJSParams): TemplateFile => {
  const { routeName, routePattern, destinationDir, pathParamsInterfaceName, pathParamsFilename } = params;

  const keys = getKeysFromRoutePattern(routePattern);

  const functionName = `useParams${routeName}`;

  const resultTemplate = `${keys.reduce((prev, key) => {
    if (key.modifier) {
      return `${prev}${key.name}: query.${key.name} ? (query.${key.name} as string) : undefined,`;
    }
    return `${prev}${key.name}: query.${key.name} as string,`;
  }, "")}`;

  const template = `${printImport({
    namedImports: [{ name: pathParamsInterfaceName }],
    from: `./${pathParamsFilename}`,
  })}
    ${printImport({
      namedImports: [{ name: "useRouter" }],
      from: "next/router",
    })}
    const ${functionName} = (): ${pathParamsInterfaceName} => {
      const query = useRouter().query;
      return {${resultTemplate}};
    }
    export default ${functionName};`;

  return {
    template,
    extension: ".ts",
    filename: functionName,
    destinationDir,
  };
};

export default generateUseParamsFileNextJS;
