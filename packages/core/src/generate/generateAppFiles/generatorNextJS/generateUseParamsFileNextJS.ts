import { TemplateFile } from "../../types";
import { printImport, getKeysFromRoutePattern, getKeyType, KeyType, throwError } from "../../utils";

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

  const keys = getKeysFromRoutePattern(routePattern);

  // TODO: make this betterer + use mapper
  let resultTemplate = "";
  if (mode === "strict") {
    const templates = keys.map((key) => {
      if (getKeyType(key) === KeyType.normal) {
        if (key.modifier) {
          // TODO: abstract key.modifier check to be a util
          return `${key.name}: query.${key.name} ? (query.${key.name} as string) : undefined,`;
        }
        return `${key.name}: query.${key.name} as string,`;
      } else if (getKeyType(key) === KeyType.enum) {
        const enumOptions = key.pattern.split("|");
        const options = key.modifier ? [...enumOptions, undefined] : [...enumOptions];
        const possibleValuesVarName = `${key.name}PossibleValues`;
        let optonsTemplate = options.reduce((prev, option) => {
          if (option === undefined) {
            return `${prev}undefined,`;
          }
          return `${prev}"${option}",`;
        }, `const ${possibleValuesVarName} = [`);
        optonsTemplate += "]";

        const validatorTemplate = `if(${possibleValuesVarName}.findIndex((v) => v === query.${key.name}) === -1){
          throw new Error("Mistake");
        }`;

        return `${key.name}: (() => {
          ${optonsTemplate}
          ${validatorTemplate}
          return query.${key.name} as ${pathParamsInterfaceName}["${key.name}"]
        })(),`;
      }
      return throwError([routeName], "route-codegen is only supporting string and enum patterns at the moment.");
    });
    resultTemplate = templates.join("");
  } else {
    resultTemplate = `${keys.reduce((prev, key) => {
      if (key.modifier) {
        return `${prev}${key.name}: query.${key.name} ? (query.${key.name} as string) : undefined,`;
      }
      return `${prev}${key.name}: query.${key.name} as string,`;
    }, "")}`;
  }

  const template = `${printImport({ namedImports: [{ name: pathParamsInterfaceName }], from: `./${pathParamsFilename}` })}
    ${printImport({ namedImports: [{ name: "useRouter" }], from: "next/router" })}
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
