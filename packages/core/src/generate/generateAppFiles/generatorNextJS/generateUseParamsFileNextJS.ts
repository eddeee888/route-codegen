import { TemplateFile } from "../../types";
import { printImport, keyHelpers, KeyType, throwError } from "../../utils";
import isOptional from "../../utils/keyHelpers/isOptional";

export interface GenerateUseParamsFileNextJSParams {
  routeName: string;
  routePattern: string;
  destinationDir: string;
  pathParamsInterfaceName: string;
  pathParamsFilename: string;
  mode: "strict" | "loose";
}

// NextJS useRouter simply returns all dynamic params as strings
const generateUseParamsFileNextJS = (params: GenerateUseParamsFileNextJSParams): TemplateFile => {
  const { routeName, routePattern, destinationDir, pathParamsInterfaceName, pathParamsFilename, mode } = params;

  const functionName = `useParams${routeName}`;

  const keys = keyHelpers.getKeysFromRoutePattern(routePattern);

  const printFieldType = (keyName: string | number): string => `${pathParamsInterfaceName}["${keyName}"]`;

  const templateMap: Record<GenerateUseParamsFileNextJSParams["mode"], () => string> = {
    strict: function createStrictTemplate() {
      const templates = keys.map((key) => {
        if (keyHelpers.getType(key) === KeyType.normal) {
          if (keyHelpers.isOptional(key)) {
            return `${key.name}: query.${key.name} ? (query.${key.name} as ${printFieldType(key.name)}) : undefined,`;
          }
          return `${key.name}: query.${key.name} as ${printFieldType(key.name)},`;
        } else if (keyHelpers.getType(key) === KeyType.enum) {
          const enumOptions = key.pattern.split("|");
          const options = keyHelpers.isOptional(key) ? [...enumOptions, undefined] : [...enumOptions];
          const possibleValuesVarName = `${key.name}PossibleValues`;
          let optonsTemplate = options.reduce((prev, option) => {
            if (option === undefined) {
              return `${prev}undefined,`;
            }
            return `${prev}"${option}",`;
          }, `const ${possibleValuesVarName} = [`);
          optonsTemplate += "]";

          const validatorTemplate = `if(${possibleValuesVarName}.findIndex((v) => v === query.${key.name}) === -1){
            throw new Error("Unable to match '${key.name}' with expected enums");
          }`;

          return `${key.name}: (() => {
            ${optonsTemplate}
            ${validatorTemplate}
            return query.${key.name} as ${printFieldType(key.name)}
          })(),`;
        }
        return throwError([routeName], "route-codegen is only supporting string and enum patterns at the moment.");
      });
      return templates.join("");
    },
    loose: function createLooseTemplate() {
      return `${keys.reduce((prev, key) => {
        if (isOptional(key)) {
          return `${prev}${key.name}: query.${key.name} ? (query.${key.name} as ${printFieldType(key.name)}) : undefined,`;
        }
        return `${prev}${key.name}: query.${key.name} as ${printFieldType(key.name)},`;
      }, "")}`;
    },
  };

  const template = `${printImport({ namedImports: [{ name: pathParamsInterfaceName }], from: `./${pathParamsFilename}` })}
    ${printImport({ namedImports: [{ name: "useRouter" }], from: "next/router" })}
    const ${functionName} = (): ${pathParamsInterfaceName} => {
      const query = useRouter().query;
      return {${templateMap[mode]()}};
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
