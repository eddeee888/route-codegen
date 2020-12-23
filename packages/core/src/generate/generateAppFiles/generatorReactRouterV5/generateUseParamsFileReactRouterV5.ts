import { TemplateFile, Import } from "../../types";
import { printImport, capitalizeFirstChar } from "../../utils";

export interface GenerateUseParamsFileReactRouterV5Params {
  routeName: string;
  destinationDir: string;
  patternName: string;
  pathParamsInterfaceName: string;
  pathParamsFilename: string;
  mode: "strict" | "loose";
}

const generateUseParamsFileReactRouterV5 = (params: GenerateUseParamsFileReactRouterV5Params): TemplateFile => {
  const { routeName: originalRouteName, destinationDir, patternName, pathParamsInterfaceName, pathParamsFilename, mode } = params;

  const routeName = capitalizeFirstChar(originalRouteName);

  const functionName = `useParams${routeName}`;

  const modeMap: Record<GenerateUseParamsFileReactRouterV5Params["mode"], { template: string; namedImports: Import["namedImports"] }> = {
    loose: {
      namedImports: [{ name: pathParamsInterfaceName }],
      template: `return useRouteMatch<${pathParamsInterfaceName}>().params;`,
    },
    strict: {
      namedImports: [{ name: pathParamsInterfaceName }, { name: patternName, importAs: "pattern" }],
      template: `const { path, params } = useRouteMatch<${pathParamsInterfaceName}>();
    if (path !== pattern) {
      const error = \`You are trying to use useParams for "${"${pattern}"}" in "${"${path}"}". Make sure you are using the right route link object!\`;
      throw new Error(error);
    }
    return params;`,
    },
  };

  const template = `${printImport({ namedImports: modeMap[mode].namedImports, from: `./${pathParamsFilename}` })}
    ${printImport({ namedImports: [{ name: "useRouteMatch" }], from: "react-router" })}
    const ${functionName} = (): ${pathParamsInterfaceName} => {
      ${modeMap[mode].template}
    }
    export default ${functionName};`;

  return {
    template,
    extension: ".ts",
    filename: functionName,
    destinationDir,
    routeName: originalRouteName,
    hasDefaultExport: true,
    hasNamedExports: false,
  };
};

export default generateUseParamsFileReactRouterV5;
